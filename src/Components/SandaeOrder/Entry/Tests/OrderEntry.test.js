import { render, screen , waitFor } from "../../../../Test-Utility/test-utils";
import { server } from "../../../../mocks/server";
import { rest } from "msw";
import OdrerEntry from "../OdrerEntry";
import userEvent from "@testing-library/user-event";

test('Handle Error for scoops and toppings routes' , async ()=> {
    server.resetHandlers(
        rest.get("http://localhost:3030/scoops" , (req, res, ctx)=> {
            res(ctx.status(500))
        }),
        rest.get('http://localhost:3030/toppings',(req,res,ctx) => {
            res(ctx.status(500))
        }) 
    ); 

    render(<OdrerEntry setOrderPhase={jest.fn()}/>);

    await waitFor( async()=>{
        const errorAlerts = await screen.findAllByRole('alert');
        expect(errorAlerts).toHaveLength(2);
    });
})

test('Order button disable when ther is no scoops ordered' , async()=> {
    render(<OdrerEntry />);
    const orderButton = screen.getByRole('button' , {name : /Order sundae/i});
    expect(orderButton).toBeDisabled();

    const VanillaInput = await screen.findByRole('spinbutton' , {name : 'Vanilla'});
    userEvent.clear(VanillaInput);
    userEvent.type(VanillaInput , '1');
    expect(orderButton).toBeEnabled();

    userEvent.clear(VanillaInput);
    userEvent.type(VanillaInput , '0');
    expect(orderButton).toBeDisabled();

})
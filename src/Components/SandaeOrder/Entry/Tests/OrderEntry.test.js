import { render, screen , waitFor } from "../../../../Test-Utility/test-utils";
import { server } from "../../../../mocks/server";
import { rest } from "msw";
import OdrerEntry from "../OdrerEntry";

test('Handle Error for scoops and toppings routes' , async ()=> {
    server.resetHandlers(
        rest.get("http://localhost:3030/scoops" , (req, res, ctx)=> {
            res(ctx.status(500))
        }),
        rest.get('http://localhost:3030/toppings',(req,res,ctx) => {
            res(ctx.status(500))
        }) 
    ); 

    render(<OdrerEntry />);

    await waitFor( async()=>{
        const errorAlerts = await screen.findAllByRole('alert');
        expect(errorAlerts).toHaveLength(2);
    });
})
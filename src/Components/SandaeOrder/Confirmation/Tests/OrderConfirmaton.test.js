import { screen, render , waitFor} from "../../../../Test-Utility/test-utils";
import OrderConfirmation from "../OrderConfirmation";
import {server} from '../../../../mocks/server';
import {rest} from 'msw';

test('Show and hide Loading.. div while waiting the server' , async()=> {
    render(<OrderConfirmation />);

    // to be initially in the document
    const loadingText = screen.getByText('Loading' , {exact : false});
    expect(loadingText).toBeInTheDocument();

    // generate an order number
    const ordernumberText = await screen.findByText('Your order number is:' , {exact : false});
    expect(ordernumberText).toHaveTextContent('7605371106');

    // expect the loading to disappear from the document
    expect(loadingText).not.toBeInTheDocument();

})

test('Handle Error for not getting order Number from the server' , async()=> {
    server.resetHandlers(
        rest.post('http://localhost:3030/order' ,(req, res, ctx)=> {
            res(ctx.status(500));
        })
    )
    render(<OrderConfirmation />);

    await waitFor( async()=>{
        const errorAlert = await screen.findByRole('alert');
        expect(errorAlert).toHaveTextContent("Can't fetch data from the server, Please try again later");
    });


})
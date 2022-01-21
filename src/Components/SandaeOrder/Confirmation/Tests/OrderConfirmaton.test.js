import { screen, render } from "../../../../Test-Utility/test-utils";
import OrderConfirmation from "../OrderConfirmation";

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
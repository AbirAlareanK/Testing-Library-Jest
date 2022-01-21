import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App';

test('App phases workflow - The happy path' , async()=> {
    // render the app
    render(<App />);

    // add scoop and topping
    const VanillaInput = await screen.findByRole('spinbutton' , {name : 'Vanilla'});
    userEvent.type(VanillaInput , '1');
    const cherriesCheckbox = await screen.findByRole('checkbox' , {name : 'Cherries'});
    userEvent.click(cherriesCheckbox);

    // find and click order button
    const orderButton = screen.getByRole('button' , {name : /Order Sundae/i});
    userEvent.click(orderButton)

    //check summary information based on order
    const scoopsSubtotal = screen.getByText('your total for scoops order is' , {exact: false});
    expect(scoopsSubtotal).toHaveTextContent('2.00');
    const toppingsSubtotal = screen.getByText('your total for Toppings order is' , {exact : false});
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    //accept T&C and click confirm order button
    const confirmCheckbox = screen.getByRole('checkbox' , {name : /terms and conditions/i});
    const confirmOrderButton = screen.getByRole('button' , {name : /confirm order/i})
    userEvent.click(confirmCheckbox);
    userEvent.click(confirmOrderButton);

    //confirm order number on  confirmatiom page
    const ordernumberText = await screen.findByText('Your order number is:' , {exact : false});
    expect(ordernumberText).toHaveTextContent('7605371106');
    // click new order button on confirmation page
    const newOrderButton = screen.getByRole('button' , {name : /create new Order/i})
    userEvent.click(newOrderButton);

    // check scoops and topping subtotals has been reset
    const toppingsTotal = await screen.findByText('Toppings total:' , {exact: false});
    expect(toppingsTotal).toHaveTextContent('0.00');
    const scoopsTotal = await screen.findByText('Scoops total:' , {exact: false});
    expect(scoopsTotal).toHaveTextContent('0.00');
    
    await screen.findByRole('spinbutton' , {name: 'Vanilla'})
    await screen.findByRole('checkbox' , {name: 'Cherries'})

});
import { render , screen } from "../../../../Test-Utility/test-utils"
import userEvent from '@testing-library/user-event';
import Options from "../Options";

test.skip('Update scoop subtotal when scoops changed' , async ()=> {
    render(<Options optionType="scoops" />);

    const scoopSubtotal = screen.getByText('Scoops total: $' , {exact : false});
    expect(scoopSubtotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton' , {name : "Vanilla"})
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput , '1')
    expect(scoopSubtotal).toHaveTextContent('2.00');

    const chocolateInput = await screen.findByRole('spinbutton' , {name : "Chocolate"});
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput , '2')
    expect(scoopSubtotal).toHaveTextContent('6.00')
})

test('Update topping subtotal when toppinng changed' , async ()=> {
    render(<Options optionType="toppings"/>);
    const toppingsSubtotal = screen.getByText('Toppings total: $' , {exact : false});
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    const cherriesCheckbox = await screen.findByRole('checkbox' , {name : 'Cherries'});
    
    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    const mnms = await screen.findByRole('checkbox' , {name : 'M&Ms'});
    userEvent.click(mnms);
    expect(toppingsSubtotal).toHaveTextContent('3.00');
    userEvent.click(mnms);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

})
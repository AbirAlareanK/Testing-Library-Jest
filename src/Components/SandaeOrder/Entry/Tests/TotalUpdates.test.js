import { render , screen } from "../../../../Test-Utility/test-utils"
import userEvent from '@testing-library/user-event';
import Options from "../Options";
import OrderEntry from '../OdrerEntry';

test('Update scoop subtotal when scoops changed' , async ()=> {
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

describe('Update Grand Total' , ()=> {
    test('Grands total updates when scoops updates first' , async ()=> {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading' , {name : /grand total: \$/i});
        expect(grandTotal).toHaveTextContent('0.00');

        const vanillaInput = await screen.findByRole('spinbutton' , {name : 'Vanilla'})
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput ,'2');
        expect(grandTotal).toHaveTextContent('4.00');

        const cherriesInput = await screen.findByRole('checkbox' , {name : 'Cherries'});
        userEvent.click(cherriesInput)
        expect(grandTotal).toHaveTextContent('5.50')
    });


    test('Grands total updates when toppings updates first' , async()=> {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading' , {name : /grand total: \$/i});

        const cherriesCheckbox = await screen.findByRole('checkbox' , {name : 'Cherries'});
        userEvent.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent('1.50')

        const vanillaInput = await screen.findByRole('spinbutton' , {name : 'Vanilla'})
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');
        expect(grandTotal).toHaveTextContent('5.50');

    })

    test('Grand total updates properly when an item is removed' , async() => {
        render(<OrderEntry />);
        const cherriesCheckbox = await screen.findByRole('checkbox' , {name : 'Cherries'});
        userEvent.click(cherriesCheckbox)

        const vanillaInput = await screen.findByRole('spinbutton' , {name : 'Vanilla'})
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');

        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput,'1');

        const grandTotal = screen.getByRole('heading' , {name : /grand total: \$/i});
        expect(grandTotal).toHaveTextContent('3.50');

        userEvent.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent('2');
    })
})

// describe('grand total', () => {
//     test('grand total updates properly if scoop is added first', async () => {
//       render(<OrderEntry />);
//       const grandTotal = screen.getByRole('heading', {
//         name: /grand total: \$/i,
//       });
  
//       // check that the grand total starts out at 0
//       expect(grandTotal).toHaveTextContent('0.00');
  
//       // update vanilla scoops to 2 and check grand total
//       const vanillaInput = await screen.findByRole('spinbutton', {
//         name: 'Vanilla',
//       });
//       userEvent.clear(vanillaInput);
//       userEvent.type(vanillaInput, '2');
//       expect(grandTotal).toHaveTextContent('4.00');
  
//       // add cherries and check grand total
//       const cherriesCheckbox = await screen.findByRole('checkbox', {
//         name: 'Cherries',
//       });
//       userEvent.click(cherriesCheckbox);
//       expect(grandTotal).toHaveTextContent('5.50');
//     });
  
//     test('grand total updates properly if topping is added first', async () => {
//       render(<OrderEntry />);
  
//       // add cherries and check grand total
//       const cherriesCheckbox = await screen.findByRole('checkbox', {
//         name: 'Cherries',
//       });
//       userEvent.click(cherriesCheckbox);
//       const grandTotal = screen.getByRole('heading', {
//         name: /grand total: \$/i,
//       });
//       expect(grandTotal).toHaveTextContent('1.50');
  
//       // update vanilla scoops to 2 and check grand total
//       const vanillaInput = await screen.findByRole('spinbutton', {
//         name: 'Vanilla',
//       });
//       userEvent.clear(vanillaInput);
//       userEvent.type(vanillaInput, '2');
//       expect(grandTotal).toHaveTextContent('5.50');
//     });
  
//     test('grand total updates properly if item is removed', async () => {
//       render(<OrderEntry />);
  
//       // add cherries
//       const cherriesCheckbox = await screen.findByRole('checkbox', {
//         name: 'Cherries',
//       });
//       userEvent.click(cherriesCheckbox);
//       // grand total $1.50
  
//       // update vanilla scoops to 2; grand total should be $5.50
//       const vanillaInput = await screen.findByRole('spinbutton', {
//         name: 'Vanilla',
//       });
//       userEvent.clear(vanillaInput);
//       userEvent.type(vanillaInput, '2');
  
//       // remove 1 scoop of vanilla and check grand total
//       userEvent.clear(vanillaInput);
//       userEvent.type(vanillaInput, '1');
  
//       // check grand total
//       const grandTotal = screen.getByRole('heading', {
//         name: /grand total: \$/i,
//       });
//       expect(grandTotal).toHaveTextContent('3.50');
  
//       // remove cherries and check grand total
//       userEvent.click(cherriesCheckbox);
//       expect(grandTotal).toHaveTextContent('2.00');
//     });
//   });
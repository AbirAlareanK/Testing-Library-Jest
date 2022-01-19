import {render , screen, waitForElementToBeRemoved} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from './SummaryForm';

test('The checkbox for T&C is unchecked' , ()=> {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i});
    expect(checkbox).not.toBeChecked();
})

test('Enable submit order button once the checkbox is checked' , ()=> {
    render(<SummaryForm />);
    const submitButton = screen.getByRole('button' , {name : /confirm order/i });
    const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i});

    expect(submitButton).toBeDisabled();
    userEvent.click(checkbox);
    expect(submitButton).toBeEnabled();
    userEvent.click(checkbox);
    expect(submitButton).toBeDisabled();

})

test('Popover response to hover on checkbox label' , async ()=> {
    render(<SummaryForm />);

    // Start hidden
    const nullPopOver =  screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopOver).not.toBeInTheDocument();


    //Apear on mouse over the checkbox label
    const checkboxLabel = screen.getByText(/terms and conditions/i);
    userEvent.hover(checkboxLabel);
    const popOver = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popOver).toBeInTheDocument();

    //disappear on mouse out
    userEvent.unhover(checkboxLabel);
    await waitForElementToBeRemoved(()=> screen.queryByText(/no ice cream will actually be delivered/i))
})
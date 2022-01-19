import {render , screen , fireEvent} from "@testing-library/react";
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
    fireEvent.click(checkbox);
    expect(submitButton).toBeEnabled();
    fireEvent.click(checkbox);
    expect(submitButton).toBeDisabled();

})
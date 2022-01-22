import { render , screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

test('Validate scoop input value' , async()=> {
    render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()}/>)

    const anyInput = await screen.findByRole('spinbutton')
    // check if the value is higher than 10
    userEvent.clear(anyInput);
    userEvent.type(anyInput , '13');
    expect(anyInput).toHaveClass('is-invalid');

    // check if the value is negative
    userEvent.clear(anyInput);
    userEvent.type(anyInput , '-12');
    expect(anyInput).toHaveClass('is-invalid');
    
    // check if the value is Decimal
    userEvent.clear(anyInput);
    userEvent.type(anyInput , '0.4');
    expect(anyInput).toHaveClass('is-invalid');

})
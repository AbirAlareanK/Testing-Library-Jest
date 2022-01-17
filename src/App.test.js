import { render, screen , fireEvent } from '@testing-library/react';
import App from './App';

test('Button has correct initial condition', () => {
  render(<App />);
  const button = screen.getByRole('button' , {name : /change to blue/i }) 
  expect(button).toHaveStyle({backgroundColor : 'red'})
  fireEvent.click(button);

  expect(button).toHaveStyle({backgroundColor : 'blue'})

  expect(button.textContent).toBe('Change to red')
});


test('initial button condition' , () => {
  render(<App />);

  const button = screen.getByRole('button' , { name : /change to blue/i  })

  expect(button).toBeEnabled();

})

test('Toggle button disability on click' , () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox');
  const button = screen.getByRole('button' , {name : /Change to blue/i })
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

})

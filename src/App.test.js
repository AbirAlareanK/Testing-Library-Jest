import { render, screen , fireEvent } from '@testing-library/react';
import App , {precedeCamelToSpace} from './App';

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
  
  expect(button).toHaveStyle({backgroundColor : 'red'});

})

test('Toggle button disability on click' , () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox' , {name : 'Disable button'});
  const button = screen.getByRole('button' , {name : /Change to blue/i })
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

})

test('Disabled button has a gray bg and reverts to red' , ()=> {
  
  render(<App />);

  const checkbox = screen.getByRole('checkbox' , {name : 'Disable button'});
  const button = screen.getByRole('button' , {name : /Change to blue/i });
  
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor : 'gray'});

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor : 'red'});

})

test('clicked disabled button has gray bg and reverts to blue' , ()=> {
  render(<App />);

  const checkbox = screen.getByRole('checkbox' , {name : 'Disable button'});
  const button = screen.getByRole('button' , {name : /Change to blue/i });

  fireEvent.click(button);

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor : 'gray'});

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor : 'blue'});

})

describe('Spaces before camel case capitals' , () => {
  test('Works for no inner capitals letters' , () => {
      expect(precedeCamelToSpace('Red')).toBe('Red');
  });
  test('Works for one inner capital letter' , () => {
    expect(precedeCamelToSpace('MidnightBlue')).toBe('Midnight Blue');
    
  });
  test('Works for multiple inner capital letters' , () => {
    expect(precedeCamelToSpace('MediumVioletRed')).toBe('Medium Violet Red');
    
  });
})
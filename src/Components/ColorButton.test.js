import { render, screen , fireEvent } from '@testing-library/react';
import ColorButton , {precedeCamelToSpace} from './ColorButton';

test('Button has correct initial condition', () => {
  render(<ColorButton />);
  const button = screen.getByRole('button' , {name : /Change to Midnight Blue/i }) 
  expect(button).toHaveStyle({backgroundColor : 'MediumVioletRed'})
  fireEvent.click(button);

  expect(button).toHaveStyle({backgroundColor : 'MidnightBlue'})

  expect(button).toHaveTextContent('Change to Medium Violet Red')
});


test('initial button condition' , () => {
  render(<ColorButton />);

  const button = screen.getByRole('button' , { name : /Change to Midnight Blue/i  })

  expect(button).toBeEnabled();
  
  expect(button).toHaveStyle({backgroundColor : 'MediumVioletRed'});

})

test('Toggle button disability on click' , () => {
  render(<ColorButton />);

  const checkbox = screen.getByRole('checkbox' , {name : 'Disable button'});
  const button = screen.getByRole('button' , {name : /Change to Midnight Blue/i })
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

})

test('Disabled button has a gray bg and reverts to red' , ()=> {
  
  render(<ColorButton />);

  const checkbox = screen.getByRole('checkbox' , {name : 'Disable button'});
  const button = screen.getByRole('button' , {name : /Change to Midnight Blue/i });
  
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor : 'gray'});

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor : 'MediumVioletRed'});

})

test('clicked disabled button has gray bg and reverts to blue' , ()=> {
  render(<ColorButton />);

  const checkbox = screen.getByRole('checkbox' , {name : 'Disable button'});
  const button = screen.getByRole('button' , {name : /Change to Midnight Blue/i });

  fireEvent.click(button);

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor : 'gray'});

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor : 'MidnightBlue'});

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
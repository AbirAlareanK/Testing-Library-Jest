import { useState } from "react";

export function precedeCamelToSpace(colorName) {
    return colorName.replace(/\B([A-Z])\B/g, ' $1');
 }
 
const ColorButton = () => {

    const [ buttonColor , setButtonColor ] = useState('MediumVioletRed') ;
    const [ disabledButton , setDisabledButton ] = useState(false);
  
    const newButtonColor = buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed'
  
    
    return (
        <>
            <button onClick={()=> setButtonColor(newButtonColor)}
                    style={{backgroundColor : disabledButton ? 'gray' : buttonColor}}
                    disabled={disabledButton}
            >Change to {precedeCamelToSpace(newButtonColor)}</button>
            <input type="checkbox"
                    id="disable-button-checkbox"
                    aria-checked={disabledButton}
                    defaultChecked={disabledButton}
                    onChange={(e)=> setDisabledButton(e.target.checked)}/>
            <label htmlFor="disable-button-checkbox">Disable button</label>
        </>
    );
};

export default ColorButton;
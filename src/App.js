import { useState } from 'react';
import './App.css';

function App() {

  const [ buttonColor , setButtonColor ] = useState('red') ;
  const [ disabledButton , setDisabledButton ] = useState(false);

  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red'

  return (
    <div className="App-header">
        <button onClick={()=> setButtonColor(newButtonColor)}
                style={{backgroundColor : disabledButton ? 'gray' : buttonColor}}
                disabled={disabledButton}
        >Change to {newButtonColor}</button>
        <input type="checkbox"
                id="disable-button-checkbox"
                aria-checked={disabledButton}
                defaultChecked={disabledButton}
                onChange={(e)=> setDisabledButton(e.target.checked)}/>
        <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;

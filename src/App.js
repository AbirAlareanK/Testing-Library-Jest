import { useState } from 'react';
import './App.css';

function App() {

  const [ buttonColor , setButtonColor ] = useState('red') ;
  const [ disabledButton , setDisabledButton ] = useState(false);

  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red'

  return (
    <div className="App-header">
        <button onClick={()=> setButtonColor(newButtonColor)}
                style={{backgroundColor : buttonColor}}
                disabled={disabledButton}
        >Change to {newButtonColor}</button>
        <input type="checkbox"
                id="enable-button-checkbox"
                aria-checked={disabledButton}
                defaultChecked={disabledButton}
                onChange={(e)=> setDisabledButton(e.target.checked)}/>
    </div>
  );
}

export default App;

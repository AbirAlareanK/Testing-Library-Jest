import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import OrderConfirmation from './Components/SandaeOrder/Confirmation/OrderConfirmation';
import OrderEntry from './Components/SandaeOrder/Entry/OdrerEntry';
import OrderSummary from './Components/SandaeOrder/Summary/OrderSummary';
import { OrderDetailsProvider } from './Context/OrderDetails';

function App() {
  const [ orderPhase , setOrderPhase ] = useState('inProgress');

  let Component = OrderEntry ;
  switch(orderPhase){
    case 'review' : 
      Component = OrderSummary
    break;
    case 'complete' : 
      Component = OrderConfirmation
    break;
    case 'inProgress' :
      Component = OrderEntry
    break;
    default: return null;
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <Component setOrderPhase={setOrderPhase} style={{width:'60%'}}/>
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
import Container from 'react-bootstrap/Container';
import OrderEntry from './Components/SandaeOrder/Entry/OdrerEntry';
import { OrderDetailsProvider } from './Context/OrderDetails';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirmation page does not need provider */}
    </Container>
  );
}

export default App;
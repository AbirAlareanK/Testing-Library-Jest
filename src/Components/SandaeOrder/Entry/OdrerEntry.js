import Options from '../Entry/Options';
import { useOrderDetails } from '../../../Context/OrderDetails';
import  Button from 'react-bootstrap/Button';

const OdrerEntry = ({setOrderPhase }) => {

    const [orderDetails] = useOrderDetails();

    const orderDisabled = orderDetails.totals.scoops === '$0.00' ? true : false;

    return (
        <>
            <h1>Design Your Sundae!</h1>
            <Options optionType="scoops"/>
            <br/>
            <Options optionType="toppings"/>
            <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
            <Button variant="primary"
                    disabled={orderDisabled}
                    onClick={()=> setOrderPhase('review')}>
                Order Sundae
            </Button>
        </>
    );
};

export default OdrerEntry;
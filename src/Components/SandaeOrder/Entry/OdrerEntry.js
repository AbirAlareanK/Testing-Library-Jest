import Options from '../Entry/Options';
import { useOrderDetails } from '../../../Context/OrderDetails';

const OdrerEntry = () => {
    const [orderDetails] = useOrderDetails()
    return (
        <>
            <h1>Design your Sundae!</h1>
            <Options optionType="scoops"/>
            <br/>
            <Options optionType="toppings"/>
            <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
        </>
    );
};

export default OdrerEntry;
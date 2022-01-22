import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../../Context/OrderDetails";

const OrderSummary = ({setOrderPhase}) => {

    const [orderDetails] = useOrderDetails();

    return (
        <div style={{textAlign : 'center'}}>
            <h2>Your Order Summary</h2>
            <p>your total for Toppings order is: {orderDetails.totals['toppings']}</p>
            <p>your total for Scoops order is: {orderDetails.totals['scoops']}</p>
            <p>Please accept t$C to proceed..</p>
            <SummaryForm setOrderPhase={setOrderPhase}/>
        </div>
    );
};

export default OrderSummary;
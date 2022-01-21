import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useOrderDetails } from "../../../Context/OrderDetails";

const OrderConfirmation = ({setOrderPhase}) => {
    const [ orderNumber , setOrderNumber ] = useState(null);
    const [ , , resetOrder] = useOrderDetails();

    useEffect(()=>{
        axios.post('http://localhost:3030/order')
        .then((response) => setOrderNumber(response.data.orderNumber))
        .catch((error) => console.log(error.messaage))
    },[])

    const HandleClick = () => {
        resetOrder();

        setOrderPhase('inProgress')
    }

    if(orderNumber){
        return (
            <div style={{textAlign : 'center'}}>
                <h2>Thank You!</h2>   
                <p>Your order number is: {orderNumber}</p>
                <p>As per our terms and conditions, nothing will happen now</p>
                <Button variant="primary"
                        onClick={HandleClick}>
                    Create New Order
                </Button>
            </div>
        )
    }else{
        return (<div>
                    <p>Loading...</p>
                </div>)
    }
};

export default OrderConfirmation;
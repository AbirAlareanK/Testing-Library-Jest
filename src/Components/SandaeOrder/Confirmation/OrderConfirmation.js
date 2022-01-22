import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useOrderDetails } from "../../../Context/OrderDetails";
import AlertBanner from "../UIs/AlertBanner";

const OrderConfirmation = ({setOrderPhase}) => {
    const [ orderNumber , setOrderNumber ] = useState(null);
    const [ , , resetOrder] = useOrderDetails();
    const [ error , setError ] = useState(false);

    useEffect(()=>{
        axios.post('http://localhost:3030/order')
        .then((response) => setOrderNumber(response.data.orderNumber))
        .catch((error) => setError(true))
    },[])

    const HandleClick = () => {
        resetOrder();

        setOrderPhase('inProgress')
    }

    if(error){
        return (<AlertBanner/>)
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
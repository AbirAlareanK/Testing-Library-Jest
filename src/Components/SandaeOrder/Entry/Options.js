import axios from 'axios';
import { useEffect , useState } from 'react';
import { Row } from 'react-bootstrap';
import AlertBanner from '../UIs/AlertBanner';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import { pricePerItem } from '../../../Constants';
import { useOrderDetails } from '../../../Context/OrderDetails';
import { formatCurrency } from '../../../Utilitis';

const Options = ({optionType}) => {

    const [ items , setItems ] = useState([]);
    const [ error , setError ] = useState(false);
    const [orderDetails, updateItemCount] = useOrderDetails();

    console.log(orderDetails.totals['scoops'])
    useEffect(()=>{
        axios.get(`http://localhost:3030/${optionType}`)
        .then((response) => setItems(response.data))
        .catch((error) => {
            console.log(error);
            setError(true)
        });
    },[optionType]);

    if(error){
        return(<AlertBanner />);
    }

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

    const optionItems = items.map(item => <ItemComponent   
                                                name={item.name}
                                                key={item.name}
                                                imagePath={item.imagePath}
                                                updateItemCount={(itemName, newItemCount) =>
                                                    updateItemCount(itemName, newItemCount, optionType)
                                                }/>)
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])} each</p>
            <p>
            {title} total: {orderDetails.totals[optionType]}
            </p>
            <Row>{optionItems}</Row>
        </>
    );
};

export default Options;
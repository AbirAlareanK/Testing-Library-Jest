import axios from 'axios';
import { useEffect , useState } from 'react';
import { Row } from 'react-bootstrap';
import AlertBanner from '../UIs/AlertBanner';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

const Options = ({optionType}) => {

    const [ items , setItems ] = useState([]);
    const [ error , setError ] = useState(false);

    console.log(optionType)
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

    const optionItems = items.map(item => <ItemComponent   name={item.name}
                                                            key={item.name}
                                                            imagePath={item.imagePath}/>)
    return (
        <Row>
            {optionItems}
        </Row>
    );
};

export default Options;
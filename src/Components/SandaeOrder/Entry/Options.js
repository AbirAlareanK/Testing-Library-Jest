import axios from 'axios';
import { useEffect , useState } from 'react';
import { Row } from 'react-bootstrap';
import ScoopOption from './ScoopOption';

const Options = ({optionType}) => {

    const [ items , setItems ] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3030/${optionType}`)
        .then((response) => setItems(response.data))
        .catch((error) => {
           // error message display
        });
    },[optionType]);

    const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

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
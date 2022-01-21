import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function ScoopOptions({ name, imagePath, updateItemCount }) {

    const [inputIsInvalid , setInputIsInvalid ] = useState(false);

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if( inputValue > 10 || inputValue < 0 || inputValue - Math.floor(inputValue) !== 0){
            setInputIsInvalid(true);
            return;
        }else{
            setInputIsInvalid(false);
            updateItemCount(name, event.target.value);
        }
    };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            className={inputIsInvalid ? "is-invalid" : 'invalid'}
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
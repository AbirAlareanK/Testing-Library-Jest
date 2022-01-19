import { useState } from "react";
import { Form , Button } from "react-bootstrap";

const SummaryForm = () => {

    const [ tcChecked , setTcChecked ] = useState(false);

    const checkboxLabel = (
        <span>
          I agree to <span style={{ color: 'blue' }}> Terms and Conditions</span>
        </span>
      );

    return (
        <Form>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check type="checkbox"
                            checked={tcChecked}
                            onChange={(e)=> setTcChecked(e.target.checked)}
                            label={checkboxLabel}/>  
            </Form.Group>  
            <Button disabled={!tcChecked}
                    variant="primary"
                    type="submit">
                Confirm Order
            </Button>
        </Form>
    );
};

export default SummaryForm;
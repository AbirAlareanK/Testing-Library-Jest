import { useState } from "react";
import { Form , Button , Popover , OverlayTrigger} from "react-bootstrap";

const SummaryForm = ({setOrderPhase}) => {

    const [ tcChecked , setTcChecked ] = useState(false);

    const popover = (
        <Popover id="popover-basic">
          <Popover.Body>
            No ice cream will actually be delivered
          </Popover.Body>
        </Popover>
    );
    
    const checkboxLabel = (
        <span>
          I agree to 
          <OverlayTrigger placement="right" overlay={popover}>
            <span style={{ color: 'blue' }}> Terms and Conditions</span>
          </OverlayTrigger>
        </span>
    );

    const HandleSubmit = (e) => {
      e.preventDefault();
      setOrderPhase('complete');
    }

    return (
        <Form onSubmit={HandleSubmit}>
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
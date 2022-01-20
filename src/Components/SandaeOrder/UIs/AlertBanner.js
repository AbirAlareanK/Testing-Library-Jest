import Alert  from "react-bootstrap/Alert";

const AlertBanner = ({message , variant}) => {

    const alertVariant = variant || "danger";
    const alertMessage = message || "Can't fetch data from the server, Please try again later";

    return (
        <Alert variant={alertVariant}
                style={{backgroundColor : 'crimson'}}>
            {alertMessage}
        </Alert>
    );
};

export default AlertBanner;
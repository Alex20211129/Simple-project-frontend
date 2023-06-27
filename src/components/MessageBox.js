import {Alert} from 'reactstrap';

export default function MessageBox(props)  {
    return (
        <Alert color="danger">
        {props.children}
        </Alert>
        );
}
import eventsJson from '../data/events.json';
import Event from './Event';
import { Container, Row } from 'react-bootstrap';

const Events = () => {
    return(
        <Container className="mt-5">
            <Row className="g-4">
                {eventsJson.map((event, index) => (
                    <Event key={index} event={event}/>
                ))}
            </Row>
        </Container>
    );
};

export default Events;
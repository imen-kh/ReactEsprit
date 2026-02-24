import { useState, useEffect } from 'react';
import eventsJson from '../data/events.json';
import Event from './Event';
import { Container, Row, Alert } from 'react-bootstrap';

const Events = () => {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        console.log('[Events] componentDidMount — composant monté');
        setShowAlert(true);

        const timer = setTimeout(() => {
            setShowAlert(false);
            console.log('[Events] message de bienvenue masqué après 3s');
        }, 3000);

        return () => {
            clearTimeout(timer);
            console.log('[Events] componentWillUnmount — composant démonté');
        };
    }, []);

    useEffect(() => {
        console.log('[Events] componentDidUpdate — showAlert:', showAlert);
    });

    return (
        <Container className="mt-5">
            {showAlert && (
                <Alert variant="info" className="mb-4">
                    Hey welcome to Esprit Events
                </Alert>
            )}
            <Row className="g-4">
                {eventsJson.map((event, index) => (
                    <Event key={index} event={event} />
                ))}
            </Row>
        </Container>
    );
};

export default Events;

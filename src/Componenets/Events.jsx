import { useState, useEffect } from 'react';
import { Container, Row, Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import Event from './Event';
import { getAllEvents, createEvent, deleteEvent, updateEvent } from '../services/eventService';

const Events = () => {
    const [events, setEvents]         = useState([]);
    const [showAlert, setShowAlert]   = useState(false);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState("");
    const [showModal, setShowModal]   = useState(false);
    const [newEvent, setNewEvent]     = useState({
        name: "", description: "", price: "", nbTickets: "", nbParticipants: 0, img: "event1.jpg", like: false
    });

    // componentDidMount : chargement des events + message de bienvenue
    useEffect(() => {
        console.log('[Events] componentDidMount');
        setShowAlert(true);
        const timer = setTimeout(() => setShowAlert(false), 3000);

        fetchEvents();

        return () => {
            clearTimeout(timer);
            console.log('[Events] componentWillUnmount');
        };
    }, []);

    // componentDidUpdate
    useEffect(() => {
        console.log('[Events] componentDidUpdate — events count:', events.length);
    });

    const fetchEvents = () => {
        setLoading(true);
        getAllEvents()
            .then(res => {
                setEvents(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Impossible de charger les événements. Vérifiez que json-server est lancé.");
                setLoading(false);
            });
    };

    // Mise à jour d'un event (like / book) via PUT
    const handleUpdateEvent = (updatedEvent) => {
        updateEvent(updatedEvent.id, updatedEvent)
            .then(res => {
                setEvents(prev => prev.map(e => e.id === res.data.id ? res.data : e));
            })
            .catch(() => setError("Erreur lors de la mise à jour."));
    };

    // Suppression via DELETE
    const handleDelete = (id) => {
        deleteEvent(id)
            .then(() => setEvents(prev => prev.filter(e => e.id !== id)))
            .catch(() => setError("Erreur lors de la suppression."));
    };

    // Ajout via POST
    const handleCreate = (e) => {
        e.preventDefault();
        const eventToCreate = {
            ...newEvent,
            price: parseFloat(newEvent.price),
            nbTickets: parseInt(newEvent.nbTickets),
        };
        createEvent(eventToCreate)
            .then(res => {
                setEvents(prev => [...prev, res.data]);
                setShowModal(false);
                setNewEvent({ name: "", description: "", price: "", nbTickets: "", nbParticipants: 0, img: "event1.jpg", like: false });
            })
            .catch(() => setError("Erreur lors de la création."));
    };

    return (
        <Container className="mt-5">

            {/* Message de bienvenue */}
            {showAlert && (
                <Alert variant="info" className="mb-3">
                    Hey welcome to Esprit Events
                </Alert>
            )}

            {/* Erreur */}
            {error && (
                <Alert variant="danger" dismissible onClose={() => setError("")}>
                    {error}
                </Alert>
            )}

            {/* Bouton Ajouter */}
            <div className="d-flex justify-content-end mb-3">
                <Button variant="success" onClick={() => setShowModal(true)}>
                    + Ajouter un événement
                </Button>
            </div>

            {/* Chargement */}
            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2 text-muted">Chargement des événements...</p>
                </div>
            ) : (
                <Row className="g-4">
                    {events.map(event => (
                        <Event
                            key={event.id}
                            event={event}
                            onUpdate={handleUpdateEvent}
                            onDelete={handleDelete}
                        />
                    ))}
                </Row>
            )}

            {/* Modal Ajouter événement */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvel événement</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleCreate}>
                    <Modal.Body>
                        <Form.Group className="mb-2">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control required value={newEvent.name}
                                onChange={e => setNewEvent({ ...newEvent, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={2} value={newEvent.description}
                                onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Prix (DT)</Form.Label>
                            <Form.Control required type="number" min="0" value={newEvent.price}
                                onChange={e => setNewEvent({ ...newEvent, price: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Nombre de tickets</Form.Label>
                            <Form.Control required type="number" min="0" value={newEvent.nbTickets}
                                onChange={e => setNewEvent({ ...newEvent, nbTickets: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Image</Form.Label>
                            <Form.Select value={newEvent.img}
                                onChange={e => setNewEvent({ ...newEvent, img: e.target.value })}>
                                <option value="event1.jpg">event1.jpg</option>
                                <option value="event2.jpg">event2.jpg</option>
                                <option value="event3.jpg">event3.jpg</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
                        <Button variant="success" type="submit">Créer</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </Container>
    );
};

export default Events;

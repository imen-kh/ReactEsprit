import { useState } from "react";
import { Button, Card, Col, Alert } from "react-bootstrap";

const Event = ({ event, onUpdate, onDelete }) => {
    const [eventState, setEventState]       = useState(event);
    const [bookingMessage, setBookingMessage] = useState("");

    const handleLike = () => {
        const updated = { ...eventState, like: !eventState.like };
        setEventState(updated);
        if (onUpdate) onUpdate(updated);
    };

    const handleBook = () => {
        if (eventState.nbTickets > 0) {
            const updated = {
                ...eventState,
                nbTickets: eventState.nbTickets - 1,
                nbParticipants: eventState.nbParticipants + 1,
            };
            setEventState(updated);
            if (onUpdate) onUpdate(updated);
            setBookingMessage("You have booked an event ✓");
        } else {
            setBookingMessage("No tickets available ✗");
        }
        setTimeout(() => setBookingMessage(""), 3000);
    };

    return (
        <Col md={4} sm={6} xs={12} className="mb-4">
            <Card className="h-100 shadow-sm">
                <Card.Img
                    variant="top"
                    src={`/images/${eventState.img}`}
                    style={{ height: 250, objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{eventState.name}</Card.Title>
                    <Card.Text>Price : {eventState.price}</Card.Text>
                    <Card.Text>Number of tickets : {eventState.nbTickets}</Card.Text>
                    <Card.Text>Number of participants : {eventState.nbParticipants}</Card.Text>
                    <Card.Text className="text-muted small">{eventState.description}</Card.Text>

                    {bookingMessage && (
                        <Alert
                            variant={eventState.nbTickets >= 0 && bookingMessage.includes("✓") ? "success" : "danger"}
                            className="py-1 small"
                        >
                            {bookingMessage}
                        </Alert>
                    )}

                    <div className="d-flex gap-2 mt-auto">
                        <Button
                            onClick={handleLike}
                            variant={eventState.like ? "danger" : "outline-danger"}
                            size="sm"
                            className="flex-grow-1"
                        >
                            {eventState.like ? "❤️ Liked" : "🤍 Like"}
                        </Button>
                        <Button
                            onClick={handleBook}
                            variant="primary"
                            size="sm"
                            disabled={eventState.nbTickets === 0}
                            className="flex-grow-1"
                        >
                            Book an event
                        </Button>
                        {onDelete && (
                            <Button
                                onClick={() => onDelete(eventState.id)}
                                variant="outline-secondary"
                                size="sm"
                            >
                                🗑️
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Event;

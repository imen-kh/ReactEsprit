import { useState } from "react"
import { Button, Card, Col, Alert } from "react-bootstrap"

const Event=({event})=>{
    const [EventState, setEvent] = useState(event);
    const [bookingMessage, setBookingMessage] = useState("");

const handleLike= ()=>{
    setEvent(preEvent=>({
        ...preEvent,
        like: !preEvent.like
    }));
}

const handleBook = () => {
    if (EventState.nbTickets > 0) {
      setEvent(preEvent => ({
        ...preEvent,
        nbTickets: preEvent.nbTickets - 1,
        nbParticipants: preEvent.nbParticipants + 1
      }));
      setBookingMessage("You have booked an event ✓");
      setTimeout(() => setBookingMessage(""), 3000);
    } else {
      setBookingMessage("No tickets available ✗");
      setTimeout(() => setBookingMessage(""), 3000);
    }
  }
    
    return (
        <Col md={4} sm={6} xs={12} className="mb-4">
        <Card className="h-100 shadow-sm">
        <Card.Img variant="top" src={`/images/${EventState.img}`} style={{height:250, objectFit: "cover"}}/>
        <Card.Body>
            <Card.Title>{EventState.name}</Card.Title>
            <Card.Text>Price: TD{EventState.price}</Card.Text>
            <Card.Text>Tickets: {EventState.nbTickets}</Card.Text>
            <Card.Text>Participants: {EventState.nbParticipants}</Card.Text>
            <Card.Text>{EventState.description}</Card.Text>
            {bookingMessage && <Alert variant={EventState.nbTickets > 0 ? "success" : "danger"} className="py-2">{bookingMessage}</Alert>}
            <div className="d-flex gap-2">
              <Button onClick={handleLike} variant={EventState.like ? "danger" : "outline-danger"} className="flex-grow-1">
                {EventState.like ? "Dislike" : "Like"}
              </Button>
              <Button onClick={handleBook} variant="primary" disabled={EventState.nbTickets === 0} className="flex-grow-1">
                Book an event
              </Button>
            </div>
        </Card.Body>
        </Card>
        </Col>
    )
}

export default Event
import { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";

export default function JokeAPILike(props) {
    const [like, setLike] = useState(false);
    const {joke} = props;

    const handleLike = (liking) => {
        let favoriteJoke = {setup: joke.setup, delivery: joke.delivery};
        let count = 0;
        if (liking) {
            setLike(true)
            count = 1;
        } else {
            setLike(false)
            count = -1;
        }
        axios.post('http://localhost:8000/api/favorite', {favoriteJoke, count})
    }

    return(
        <Row className="d-flex align-items-center">
            <Col xs={10}>
                <Card.Text>
                    <b>Setup:</b> <em>{joke.setup}</em>
                </Card.Text>
                <Card.Text>
                    <b>Delivery:</b> <em>{joke.delivery}</em>
                </Card.Text>
            </Col>
            <Col xs={1}>
                {like?
                <span onClick={() => handleLike(false)}>&#10084;</span>:
                <span onClick={() => handleLike(true)}>&#128420;</span>}
            </Col>
        </Row>
    );
}
import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function DadJoke() {
    const [term, setTerm] = useState('');
    const [joke, setJoke] = useState(null);
    const [like, setLike] = useState(false);

    const handleJoke = (e) => {
        e.preventDefault();
        if(term !== "") {
            axios.get(`https://icanhazdadjoke.com/search?term=${term}`, {
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(resp => setJoke(resp.data))
            .catch(err => console.log(err))
        }
    }

    const randomJoke = () => {
        axios.get('https://icanhazdadjoke.com/', {
            headers: {
                "Accept": 'application/json'
            }
        })
        .then(resp => setJoke(resp.data))
        .catch(err => console.log(err))
    }

    const handleLike = async(liking) => {
        let favoriteJoke = {joke: joke};
        let count = 0;
        if (liking) {
            setLike(true)
            count = 1;
        } else {
            setLike(false)
            count = -1;
        }
        await axios.post('http://localhost:8000/api/favorite', {favoriteJoke, count})
        console.log(like)
    }

    return(
        <Card className="h-100">
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title>Dad Jokes</Card.Title>
                {
                    joke && joke.results &&
                    joke.results.map((item, i) => {
                        return <Card.Text key={i} as={Row} className="d-flex align-items-center">
                            <Col xs={10}>
                                <em>{item.joke}</em>
                            </Col>
                            <Col xs={1}>
                                {like?
                                <span onClick={() => handleLike(false)}>&#10084;</span>:
                                <span onClick={() => handleLike(true)}>&#128420;</span>}
                            </Col>
                            </Card.Text>
                    })
                }
                {
                    joke && joke.joke &&
                    <Card.Text as={Row}>
                        <Col xs={10}>
                            <em>{joke.joke}</em>
                        </Col>
                        <Col xs={1}>
                            {like?
                            <span onClick={() => handleLike(false)}>&#10084;</span>:
                            <span onClick={() => handleLike(true)}>&#128420;</span>}
                        </Col>
                    </Card.Text>
                }
                <Form onSubmit={handleJoke}>
                    <Form.Group>
                        <Form.Label>Search for: </Form.Label>
                        <Form.Control type="text" onChange={(e) => setTerm(e.target.value)}/>
                    </Form.Group>
                    <Row className='mt-3'>
                        <Col>
                            <Button className="w-100" type="submit">Submit</Button>
                        </Col>
                        <Col>
                            <Button onClick={randomJoke} className="w-100 random">Random</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}
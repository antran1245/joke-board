import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function JokeAPI() {
    const [category, setCategory] = useState({
        "Programming": false, "Miscellaneous": false, "Pun": false, "Dark": false, "Spooky": false, "Christmas": false
    });
    const [joke, setJoke] = useState(null)
    const [like, setLike] = useState(false);


    const handleJoke = (e) => {
        e.preventDefault();
        let output = []
        for (const key in category) {
            if(category[key]) {
                output.push(key)
            }
        }
        output.join()
        axios.get(`https://v2.jokeapi.dev/joke/${output}`)
        .then(resp => {
            setJoke(resp.data)})
        .catch(err => console.log(err))
    }

    const randomJoke = () => {
        axios.get('https://v2.jokeapi.dev/joke/Any')
        .then(resp => {
            setJoke(resp.data)}
        )
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
                <Card.Title>Custom Jokes</Card.Title>
                {
                    joke && joke.setup && joke.delivery &&
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
                    <Form.Group as={Row}>
                        <Row>
                            <Form.Label>(Optional)</Form.Label>
                        </Row>

                        {Object.keys(category).map((key, i) => {
                            return <Col key={i}>
                                <Form.Check inline label={key} name={key}type={'checkbox'} onChange={(e) => setCategory({...category, [key]: !category[key]})}/>
                            </Col>
                        })}
                    </Form.Group>
                    <Row className='mt-3'>
                        <Col>
                            <Button type="submit" className="w-100">Submit</Button>
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
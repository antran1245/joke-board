import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function JokeAPI() {
    const [category, setCategory] = useState({
        "Programming": false, "Miscellaneous": false, "Pun": false, "Dark": false, "Spooky": false, "Christmas": false
    });
    const [joke, setJoke] = useState(null)

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

    return(
        <Card className="h-100">
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title>Custom Jokes</Card.Title>
                {
                    joke && joke.setup && joke.delivery &&
                    <>
                        <Card.Text>
                            <b>Setup:</b> {joke.setup}
                        </Card.Text>
                        <Card.Text>
                            <b>Delivery:</b> {joke.delivery}
                        </Card.Text>
                    </>
                }
                {
                    joke && joke.joke &&
                    <Card.Text>
                        {joke.joke}
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
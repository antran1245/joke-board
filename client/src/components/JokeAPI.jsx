import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import JokeAPILike from "./JokeAPILike";

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
        if(output.length > 0){
            output.join()
            axios.get(`https://v2.jokeapi.dev/joke/${output}`)
            .then(resp => {
                setJoke(resp.data)})
            .catch(err => console.log(err))
        } else {
            randomJoke()
        }

        setLike(false);
    }

    const randomJoke = () => {
        axios.get('https://v2.jokeapi.dev/joke/Any')
        .then(resp => {
            setJoke(resp.data)}
        )
        .catch(err => console.log(err))
        setLike(false);
    }

    const handleLike = (liking) => {
        let favoriteJoke = {joke: joke.joke};
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
        <Card className="h-100">
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title>Custom Jokes</Card.Title>
                {
                    joke && joke.setup && joke.delivery &&
                    <JokeAPILike joke={joke} />

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
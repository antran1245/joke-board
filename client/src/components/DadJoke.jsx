import axios from "axios";
import { useContext, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { RefreshContext } from "../context/RefreshContext";
import JokeArrayLike from "./JokeArrayLike";

export default function DadJoke() {
    const [term, setTerm] = useState('');
    const [joke, setJoke] = useState(null);
    const [like, setLike] = useState(false);
    const {refresh, setRefresh} = useContext(RefreshContext);

    const handleJoke = (e) => {
        e.preventDefault();
        if(term !== "") {
            axios.get(`https://icanhazdadjoke.com/search?term=${term}`, {
                headers: {
                    "Accept": "application/json",
                    "User-Agent": "https://github.com/antran1245"
                }
            })
            .then(resp => setJoke(resp.data))
            .catch(err => console.log(err))
        } else {
            randomJoke()
        }
        setLike(false);
    }

    const randomJoke = () => {
        axios.get('https://icanhazdadjoke.com/', {
            headers: {
                "Accept": 'application/json',
                "User-Agent": "https://github.com/antran1245"
            }
        })
        .then(resp => setJoke(resp.data))
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
        setRefresh(!refresh)
    }

    return(
        <Card className="h-100">
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title>Dad Jokes</Card.Title>
                {
                    joke && joke.results &&
                    joke.results.map((item, i) => {
                        return <JokeArrayLike item={item.joke} key={i} />
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
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useContext, useState } from 'react';
import JokeArrayLike from './JokeArrayLike';
import { RefreshContext } from '../context/RefreshContext';

export default function YoMomma() {
    const [query, setQuery] = useState("")
    const [joke, setJoke] = useState(null)
    const [like, setLike] = useState(false);
    const {refresh, setRefresh} = useContext(RefreshContext);

    const handleJoke = (e) => {
        e.preventDefault();
        if(query !== "") {
            axios.get(`http://localhost:8000/api/yomomma/${query}`)
            .then(resp => {
                console.log(resp.data)
                setJoke(resp.data)})
            .catch(err => console.log(err))
        } else {
            randomJoke()
        }
        setLike(false);
    }

    const randomJoke = () => {
        axios.get(`http://localhost:8000/api/yomomma`)
        .then(resp => {
            setJoke(resp.data)})
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
        <Card className='h-100'>
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title><b>Yo Momma</b></Card.Title>
                {
                    joke && joke.results &&
                    joke.results.map((item, i) => {
                        return <JokeArrayLike key={i} item={item}/>
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
                        <Form.Label>Search for :</Form.Label>
                        <Form.Control type="text" onChange={(e) => setQuery(e.target.value)}/>
                    </Form.Group>
                    <Row className='mt-3'>
                        <Col>
                            <Button type='submit' className='w-100'><b>Submit</b></Button>
                        </Col>
                        <Col>
                            <Button onClick={randomJoke} className='w-100 random'><b>Random</b></Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}
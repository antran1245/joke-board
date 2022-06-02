import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

export default function YoMomma() {
    const [query, setQuery] = useState("")
    const [joke, setJoke] = useState(null)

    const handleJoke = (e) => {
        e.preventDefault();
        if(query != "") {
            axios.get(`http://localhost:8000/api/yomomma/${query}`)
            .then(resp => {
                console.log(resp.data)
                setJoke(resp.data)})
            .catch(err => console.log(err))
        } else {
            randomJoke()
        }
    }

    const randomJoke = () => {
        axios.get(`http://localhost:8000/api/yomomma`)
        .then(resp => {
            console.log(resp.data.joke)
            setJoke(resp.data)})
        .catch(err => console.log(err))
    }
    return(
        <Card className='h-100'>
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title><b>Yo Momma</b></Card.Title>
                {
                    joke && joke.results &&
                    joke.results.map((item, i) => {
                        return <Card.Text key={i}>{item}</Card.Text>
                    })
                }
                {
                    joke && joke.joke &&
                    <Card.Text>{joke.joke}</Card.Text>
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
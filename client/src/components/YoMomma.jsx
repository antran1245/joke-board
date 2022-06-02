import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

export default function YoMomma() {
    const [query, setQuery] = useState("")
    const [joke, setJoke] = useState(null)

    const handleJoke = (e) => {
        e.preventDefault();
        if(query != "") {
            axios.get(`https://yomomma-api.herokuapp.com/jokes`, {
                mode: 'cors',
                headers: {
                    "Access-Control-Allow-Origin": "https://yomomma-api.herokuapp.com/*"
                }
            })
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
        }
    }
    return(
        <Card className='h-100'>
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title><b>Yo Momma</b></Card.Title>
                <Card.Text>{joke}</Card.Text>
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
                            <Button className='w-100 random'><b>Random</b></Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}
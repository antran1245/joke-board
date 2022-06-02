import axios from 'axios'
import { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../sass/style.scss';

export default function ChuckNorris() {
    const [list, setList] = useState([]);
    const [category, setCategory] = useState('default');
    const [joke, setJoke] = useState(null);

    useEffect(() => {
        axios.get('https://api.chucknorris.io/jokes/categories')
        .then(resp => {
            setList(resp.data)
        })
        .catch(err => console.log(err))
    }, [])

    const handleJoke = (e) => {
        e.preventDefault();
        if(category !== 'default') {
            axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`)
            .then(resp => setJoke(resp.data.value))
            .catch(err => console.log(err))
        }
    }

    return(
        <Card className='h-100'>
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title><b>Chuck Norris Jokes</b></Card.Title>
                <Card.Text><em>{joke !== 'default' && joke}</em></Card.Text>
                <Form onSubmit={handleJoke}>
                    <Form.Group as={Row} className="d-flex align-items-center">
                        <Col xs={12} lg={4}>
                            <Form.Label>Categories :</Form.Label>
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => setCategory(e.target.value)}>
                                <option value={'default'}>Default</option>
                                {
                                    list.map((item, i) => {
                                        return <option key={i} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
                                    })
                                }
                            </Form.Select>
                        </Col>
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
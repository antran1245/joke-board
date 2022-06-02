import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LeaderBoard() {
    const [list, setList] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/favorite')
        .then(resp => setList(resp.data))
        .catch(err => console.log(err))
    }, [])

    return(
        <Card className="h-100">
            <Card.Body>
                <Card.Title className="text-center"><h2>LeaderBoard</h2></Card.Title>
                <Row className="mb-2">
                    <Card.Text as={Col} xs={9} sm={10} className="text-center"><b>Joke</b></Card.Text>
                    <Card.Text as={Col} xs={3} sm={2} className="text-center"><b>Likes</b></Card.Text>
                </Row>
                {list.map((item, i) => {
                    return <Row key={i} className="d-flex align-items-center">
                        <Card.Text as={Col} xs={10} className="d-flex flex-column">
                            <span>{item.joke.setup && <b>Setup:</b>} <em>{item.joke.setup || item.joke.joke}</em></span>
                            <span>{item.joke.delivery && <b>Delivery:</b>} <em>{item.joke.delivery}</em></span>
                        </Card.Text>
                        <Card.Text as={Col} xs={1} className="text-center">{item.count}</Card.Text>
                        <hr/>
                    </Row>
                })}
            </Card.Body>
        </Card>
    );
}
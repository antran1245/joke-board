import { useContext, useState } from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import { RefreshContext } from '../context/RefreshContext';

export default function JokeArrayLike(props) {
    const [like, setLike] = useState(false);
    const {item} = props;
    const {refresh, setRefresh} = useContext(RefreshContext);

    const handleLike = (liking, joke) => {
        let favoriteJoke = {joke: joke};
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
        <>
            <Card.Text as={Row} className="d-flex align-items-center">
                <Col xs={10}>
                    <em>{item}</em>
                </Col>
                <Col xs={1}>
                    {like?
                    <span onClick={() => handleLike(false, item)}>&#10084;</span>:
                    <span onClick={() => handleLike(true, item)}>&#128420;</span>}
                </Col>
            </Card.Text>
            <hr/>
        </>
    )
}
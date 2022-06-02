import { Container, Row, Col } from 'react-bootstrap';
import ChuckNorris from './components/ChuckNorris';
import './App.css';
import './sass/style.scss';
import YoMomma from './components/YoMomma';
import JokeAPI from './components/JokeAPI';
import DadJoke from './components/DadJoke';

function App() {
  return (
    <Container fluid className='App'>
      <Row className='mt-5 d-flex justify-content-center'>
        <Col xs={12} sm={4} lg={3}>
          <ChuckNorris />
        </Col>
        <Col xs={12} sm={4} lg={3} className="mt-3 mt-sm-0 mt-lg-0">
          <YoMomma/>
        </Col>
        <Col xs={12} sm={4} lg={3} className="mt-3 mt-sm-0 mt-lg-0">
          <JokeAPI />
        </Col>
        <Col xs={12} sm={4} lg={3} className="mt-3 mt-sm-0 mt-lg-0">
          <DadJoke/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

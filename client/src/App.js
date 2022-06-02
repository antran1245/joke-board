import { Container, Row, Col } from 'react-bootstrap';
import ChuckNorris from './components/ChuckNorris';
import './App.css';
import './sass/style.scss';
import YoMomma from './components/YoMomma';
import JokeAPI from './components/JokeAPI';
import DadJoke from './components/DadJoke';
import LeaderBoard from './components/LeaderBoard';

function App() {
  return (
    <Container fluid className='App'>
      <h1 className='text-center'>Jokes Board</h1>
      <Row className='mt-1 mt-md-3 d-flex justify-content-center'>
        <Col xs={12} sm={6}>
          <LeaderBoard />
        </Col>
      </Row>
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

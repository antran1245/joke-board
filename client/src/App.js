import { Container, Row, Col } from 'react-bootstrap';
import ChuckNorris from './components/ChuckNorris';
import './App.css';
import YoMomma from './components/YoMomma';

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
          hi
        </Col>
      </Row>
    </Container>
  );
}

export default App;

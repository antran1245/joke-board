import { Container, Row, Col } from 'react-bootstrap';
import ChuckNorris from './components/ChuckNorris';
import './App.css';
import './sass/style.scss';
import YoMomma from './components/YoMomma';
import JokeAPI from './components/JokeAPI';
import DadJoke from './components/DadJoke';
import LeaderBoard from './components/LeaderBoard';
import {RefreshContext} from './context/RefreshContext';
import { useState } from 'react';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <RefreshContext.Provider value={{refresh, setRefresh}}>
      <Container className='App'>
        <h1 className='text-center'>Jokes Board</h1>
        <Row className='mt-1 mt-md-3 d-flex justify-content-center'>
          <Col xs={12}>
            <LeaderBoard />
          </Col>
        </Row>
        <Row className='mt-5 d-flex justify-content-center'>
          <Col xs={12} sm={6} lg={6} className="mt-3 mt-sm-2">
            <ChuckNorris />
          </Col>
          <Col xs={12} sm={6} lg={6} className="mt-3 mt-sm-2">
            <YoMomma/>
          </Col>
          <Col xs={12} sm={6} lg={6} className="mt-3 mt-sm-2">
            <JokeAPI />
          </Col>
          <Col xs={12} sm={6} lg={6} className="mt-3 mt-sm-2">
            <DadJoke/>
          </Col>
        </Row>
      </Container>
    </RefreshContext.Provider>
  );
}

export default App;

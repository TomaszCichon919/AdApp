import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllAds from '../../features/AllAds/AllAds';

const HomePage = () => {

  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/search/${text}`);
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col xs={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Search for ads</Form.Label>
              <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs={3}>
          <Button className='mt-4' variant="dark" type="submit" onClick={handleSubmit}>
            Search
          </Button>
        </Col>
      </Row>
      <h1>List of all ads</h1>
      <AllAds />
    </Container>
  );
};

export default HomePage;

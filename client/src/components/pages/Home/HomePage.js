import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import AllAds from '../../features/AllAds/AllAds';

const HomePage = () => {

const [text, setText] = useState('');
const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/search/${text}`);
  };

return (


  <div>
    <Container>
      <h1>List of all ads</h1>
      <div>
      <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
  
  

  
  <Form.Group className="mb-3" controlId="formTitle">
    <Form.Label>Search for ads</Form.Label>
    <Form.Control type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter login"></Form.Control>
  </Form.Group>


  <Button variant="dark" type="submit">
    Submit
  </Button>

</Form>
      </div>
      <AllAds />
    </Container>
  </div>
);
}
export default HomePage;

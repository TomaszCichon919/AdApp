import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { Alert } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const AdAdd = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);
    const [status, setStatus] = useState(null);

    const navigate = useNavigate();
    const user = useSelector(getUser);

    useEffect(() => {
        if (!user) {
          navigate('/login');
        }
      }, [user, navigate]);
  
    console.log('url', `${API_URL}/api/ads`)
    const handleSubmit = e => {
      e.preventDefault();
      console.log(title, date, address, price, photo);
  
  
      const fd = new FormData();
      fd.append('title', title);
      fd.append('date', date);
      fd.append('address', address);
      fd.append('price', price);
      fd.append('content', content);
      fd.append('photo', photo);
  
      const options = {
        method: 'POST',
        body: fd,
      };
  setStatus('loading');
      fetch(`${API_URL}/api/ads`, options)
      .then(res => {
        if(res.status === 201) {
        setStatus('success');
        setTimeout(() => {
            navigate('/');
          }, 3000);
      } else  if (res.status === 400){
        setStatus('clientError');
      } else {
        setStatus('serverError');
      }
    })
    .catch(err =>{
      setStatus('serverError');
    })
  }
  
    return (
      <Container>
        {status === "success" && (
            <Alert variant="success">
              <Alert.Heading>Success!</Alert.Heading>
              <p>You have added new ad</p>
            </Alert>
          )}
  
          {status === "serverError" && (
            <Alert variant="danger">
              <Alert.Heading>Something went wrong...</Alert.Heading>
              <p>Unexpected error.. Try again</p>
            </Alert>
          )}
  
          {status === "clientError" && (
            <Alert variant="danger">
              <Alert.Heading>Not enought data</Alert.Heading>
              <p>You have to fill all the fields.</p>
            </Alert>
          )}

          {status === "loading" && (
            <Spinner animation="border" role="status" className="block mx-auto">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
  
  
  
  
        <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
  
          <h1 className="my-4">Add new Ad</h1>
  
          
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter login"></Form.Control>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="date format: dd/mm/yyyy"></Form.Control>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Adress</Form.Label>
            <Form.Control type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder=" Enter address"></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter price"></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control type="text"  as="textarea" rows={5}  value={content} onChange={e => setContent(e.target.value)} placeholder="Enter content"></Form.Control>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" onChange={e => setPhoto(e.target.files[0])}></Form.Control>
          </Form.Group>
  
          <Button variant="dark" type="submit">
            Submit
          </Button>
  
        </Form>
  
      </Container>
    );
  };
  

export default AdAdd;
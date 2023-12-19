import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { Alert } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';

const Register = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null);

  if (process.env.NODE_ENV === 'production') {
    // Your production-specific code here
    console.log('Running in production mode');
  } else {
    // Your development-specific code here
    console.log('Running in development mode');
  }
  console.log('url', `${API_URL}/auth/register`)
  const handleSubmit = e => {
    e.preventDefault();
    console.log(login, password, phone, avatar);


    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('phone', phone);
    fd.append('avatar', avatar);

    const options = {
      method: 'POST',
      body: fd,
    };
setStatus('loading');
    fetch(`${API_URL}/auth/register`, options)
    .then(res => {
      if(res.status === 201) {
      setStatus('success');
    } else  if (res.status === 400){
      setStatus('clientError');
    } else if (res.status === 409){
      setStatus('loginError');
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
            <p>You have been successfully registered! You can now logi in...</p>
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

        {status === "loginError" && (
          <Alert variant="warning">
            <Alert.Heading>Login already in use</Alert.Heading>
            <p>You have to use other login.</p>
          </Alert>
        )}

        {status === "loading" && (
          <Spinner animation="border" role="status" className="block mx-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}




      <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>

        <h1 className="my-4">Register</h1>

        
        <Form.Group className="mb-3" controlId="formLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter login"></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number"></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" onChange={e => setAvatar(e.target.files[0])}></Form.Control>
        </Form.Group>

        <Button variant="dark" type="submit">
          Submit
        </Button>

      </Form>

    </Container>
  );
};

export default Register;
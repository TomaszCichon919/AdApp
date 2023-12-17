import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { Alert } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/usersRedux'
import { useNavigate } from 'react-router-dom';

const Login = () => {

 
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login, password})
          };
      setStatus('loading');
          fetch(`${API_URL}/auth/login`, options)
          .then(res => {
            if(res.status === 200) {
            setStatus('success');
            dispatch(logIn({login}))
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
            <p>You have been successfully logged in!</p>
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
            <Alert.Heading>Incorrect data</Alert.Heading>
            <p>Login or password are incorrect...</p>
          </Alert>
        )}

        {status === "loading" && (
          <Spinner animation="border" role="status" className="block mx-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>

      <h1 className="my-4">Sing up</h1>

      
      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter login"></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"></Form.Control>
      </Form.Group>

      <Button variant="dark" type="submit">
        Sign in
      </Button>

    </Form>

  </Container>

);
};

export default Login;
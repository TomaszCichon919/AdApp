import { Container } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/usersRedux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Logout = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(()=> {

const options = {
  method: 'DELETE',
  credentials: 'include'
};

fetch(`${API_URL}/auth/logout`, options)
 .then(()=> {
dispatch(logOut());
navigate('/');

 });
}, [dispatch, navigate]);

return (
 

 
 
 <Container>
    <h1>Logging out..</h1>

  </Container>
);
}
export default Logout;
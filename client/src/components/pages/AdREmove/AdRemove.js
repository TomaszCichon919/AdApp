import { Container } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/usersRedux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdRemove = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(()=> {
    
    const options = {
      method: 'DELETE',
    };
    
    fetch(`${API_URL}/api/logout`, options)
     .then(()=> {
    dispatch(logOut());
    navigate('/');
    
     });
    }, [dispatch]);

return (
  <Container>
    <h1>AdRemove</h1>
    
    
  </Container>
);
}

export default AdRemove;
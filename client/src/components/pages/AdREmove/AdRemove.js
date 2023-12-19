import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../config';
import { removeAd } from '../../../redux/adsRedux';

const AdRemove = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const removeAdFromServer = async () => {
      try {
        const options = {
          method: 'DELETE',
          credentials: 'include'
        };

        const response = await fetch(`${API_URL}/api/ads/${id}`, options);

        if (response.ok) {
          dispatch(removeAd(id));
          navigate('/');
        } else {
          throw new Error('Failed to delete ad');
        }
      } catch (error) {
        console.error('Error removing ad:', error);
      }
    };

    removeAdFromServer();
  }, [dispatch, id, navigate]);

  return (
    <Container>
   <p>removing ad...</p>
    </Container>
  );
};

export default AdRemove;


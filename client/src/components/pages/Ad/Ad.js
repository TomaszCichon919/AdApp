import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { IMGS_URL } from '../../../config'
import { API_URL } from '../../../config';

import { getUser } from '../../../redux/usersRedux';


const Ad = () => {
    const { id } = useParams();
    const [ad, setAd] = useState(null);
console.log(id);

const user = useSelector(getUser);
const navigate = useNavigate();

useEffect(() => {
    const fetchAd = async () => {
      try {
        if (id) {
          const response = await fetch(`${API_URL}/api/ads/${id}`);
          if (response.ok) {
            const adData = await response.json();
            setAd(adData);
          } else {
            console.error('Failed to fetch ad');
          }
        }
      } catch (error) {
        console.error('Error fetching ad:', error);
      }
    };
  
    fetchAd();
  }, []);
  
    if (!ad) {
      return <div>Loading...</div>;
    }
  

    const canEditOrDelete = user &&  user.login === ad.seller;

console.log('is?', canEditOrDelete)
    const handleEditClick = () => {
        if (canEditOrDelete) {
          // Redirect to the edit page for the ad
          navigate(`/ad/edit/${ad._id}`); 
        }
      };
    
      const handleDeleteClick = () => {
        if (canEditOrDelete) {
            navigate(`/ad/remove/${ad._id}`)
        }
      };

return (
  <Container>
    <h1>Ad details:</h1>
   <Col key={ad._id} xs={8} className='wrapper'>
    <h3 className='pt-2'>{ad.title}</h3>
    <Row>
      <Col xs={6}>
        <div className='img-container'>
          <img className='ad_img' src={IMGS_URL + ad.photo} alt={ad._id} />
        </div>
      </Col>
      <Col xs={6}>
        <p>
          <span className='caption'>Address</span>
          {ad.address}
        </p>
        <p>
          <span className='caption'>Seller</span>
          {ad.seller.login}
        </p>
        <div className='buttons-container'>
        {canEditOrDelete && (
                <Button
                  className='mb-2 align-self-end'
                  variant='warning'
                  block
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              )}
              {canEditOrDelete && (
                <Button
                  className='mb-2 align-self-end'
                  variant='danger'
                  block
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
              )}
        </div>
      </Col>
    </Row>
  </Col>
  <h1>Seller details</h1>
  <Col key={ad._id} xs={8} className='wrapper'>
    <h3 className='pt-2'>{ad.seller.login}</h3>
    <Row>
      <Col xs={6}>
        <div className='img-container'>
          <img className='ad_img' src={IMGS_URL + ad.seller.avatar} alt={ad._id} />
        </div>
      </Col>
      <Col xs={6}>
        <p>
          <span className='caption'>Phone</span>
          {ad.seller.phone}
        </p>
        <p>
          <span className='caption'>Seller</span>
          {ad.seller.login}
        </p>
      
      </Col>
    </Row>
  </Col>
  </Container>
);
};

export default Ad;


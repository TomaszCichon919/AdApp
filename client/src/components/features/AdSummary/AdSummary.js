import { Row, Col } from 'react-bootstrap';
import React from 'react';
import './AdSummary.scss';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { IMGS_URL } from '../../../config'

const AdSummary = ({ title, photo, address, _id}) =>
{

  return (
    <Col key={_id} xs={8} className='wrapper'>
    <h3 className='pt-2'>{title}</h3>
    <Row>
      <Col xs={6}>
        <div className='img-container'>
          <img className='ad_img' src={IMGS_URL + photo} alt={_id} />
        </div>
      </Col>
      <Col xs={6}>
        <p>
          <span className='caption'>Address</span>
          {address}
        </p>
        <div className='buttons-container'>
          <Link key={_id} to={'/ad/' + _id}>
            <Button className='mb-2' variant='dark' block>
              Read More
            </Button>
          </Link>
        </div>
      </Col>
    </Row>
  </Col>
);
};

export default AdSummary;


import { Row, Col } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdSummary.scss';

const AdSummary = ({ title, photo, adress, }) =>
{

  return (
  <article className="concert">
  
  <Col xs={12} md={4}>
    <div>
      
    </div>
        </Col>
          {/* <img className="concert__info__back" src={photo} alt={title}/>
          <h2 className="concert__info__performer">{ adress }</h2> */}


  </article>
);
  }
export default AdSummary;
import React from 'react';
import AdSummary from '../AdSummary/AdSummary';
import { Row, Col } from 'react-bootstrap';

const AdsList = ({ ads }) => {
  const adPairs = [];


  for (let i = 0; i < ads.length; i += 2) {
    if (i === ads.length - 1) {
      adPairs.push(
        <Row key={i}>
          <Col xs={6}>
            <AdSummary {...ads[i]} />
          </Col>
        </Row>
      );
    } else {
      adPairs.push(
        <Row key={i}>
          <Col xs={6}>
            <AdSummary {...ads[i]} />
          </Col>
          <Col xs={6}>
            <AdSummary {...ads[i + 1]} />
          </Col>
        </Row>
      );
    }
  }

  return <>{adPairs}</>;
};

export default AdsList;
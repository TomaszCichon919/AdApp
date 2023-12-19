import React from 'react';
import AdSummary from '../AdSummary/AdSummary';
import { Row, Col } from 'react-bootstrap';

const AdsList = ({ ads }) => {
  const adPairs = [];

  // Group ads into pairs
  for (let i = 0; i < ads.length; i += 2) {
    adPairs.push(
      <Row key={i}>
        <Col>
          <AdSummary {...ads[i]} />
        </Col>
        {i + 1 < ads.length && (
          <Col>
            <AdSummary {...ads[i + 1]} />
          </Col>
        )}
      </Row>
    );
  }

  return <>{adPairs}</>;
};

export default AdsList;
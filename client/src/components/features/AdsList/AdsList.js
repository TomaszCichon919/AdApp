import AdSummary from '../AdSummary/AdSummary';
import { Row } from 'reactstrap';

const AdsList = ({ ads }) => (
  <Row noGutters>
  <section>
    {ads.map(ad => <AdSummary key={ad._id} {...ad} />)}
  </section>
  </Row>
)

export default AdsList;
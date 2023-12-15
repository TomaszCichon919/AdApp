import { Container } from 'reactstrap';

import PromoCarousel from './../../features/PromoCarousel/PromoCarousel';
import AllAds from '../../features/AllAds/AllAds';

const HomePage = () => (
  <div>
    <PromoCarousel />
    <Container>
      <h1>List of all ads</h1>
      <AllAds />
    </Container>
  </div>
);

export default HomePage;

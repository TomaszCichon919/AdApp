import { Alert, Progress } from 'reactstrap';
import AdsList from '../AdsList/AdsList';
import { useSelector, useDispatch } from 'react-redux';
import { getAds, loadAdsRequest } from '../../../redux/adsRedux';
import { useEffect } from 'react';

const AllAds = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAds);
console.log('ads', ads)
  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  if (ads === undefined || !ads.length) {
    return <Alert color="info">Loading...</Alert>;
  } else if (ads.length === 0) {
    return <Alert color="info">No Ads</Alert>;
  } else {
    return <AdsList ads={ads} />;
  }
};

export default AllAds;
import { Alert, Progress } from 'reactstrap';
import AdsList from '../AdsList/AdsList';
import { useSelector, useDispatch } from 'react-redux';
import { getAds, getRequest, loadAdsRequest } from '../../../redux/adsRedux';
import { useEffect } from 'react';

const AllAds = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAds);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadAdsRequest());
  }, [dispatch]);

  if (!request) {
    return <Alert color="info">Loading...</Alert>;
  }

  if (request.pending) {
    return <Progress animated color="primary" value={2} />;
  } else if (request.error) {
    return <Alert color="warning">{request.error}</Alert>;
  } else if (!request.success || !ads.length) {
    return <Alert color="info">No Ads</Alert>;
  } else if (request.success) {
    return <AdsList ads={ads} />;
  }

  return null; 
};

export default AllAds;
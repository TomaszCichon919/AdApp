import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_URL } from '../../../config';
import AdsList from '../../features/AdsList/AdsList';

const Search = () => {
  const [ads, setAds] = useState(null);
  const { searchPhrase } = useParams();

  useEffect(() => {
    const fetchSearchAds = async () => {
      try {
        if (searchPhrase) {
          const response = await fetch(`${API_URL}/api/ads/search/${searchPhrase}`);
          if (response.ok) {
            const adData = await response.json();
            setAds(adData);
          } else {
            console.error('Failed to fetch ad');
          }
        }
      } catch (error) {
        console.error('Error fetching ad:', error);
      }
    };
  
    fetchSearchAds();
  }, []);

  if (!ads) {
    return <div>Loading...</div>;
  }

  if (ads === undefined || !ads.length) {
    return <Alert color="info">No Ads</Alert>;
  }

  return (
    <div>
      <h2>Search results</h2>
      <AdsList ads={ads} />
    </div>
  );
};

export default Search;
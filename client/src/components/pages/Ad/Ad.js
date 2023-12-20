import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { IMGS_URL } from '../../../config'
import { API_URL } from '../../../config';
import { getUser } from '../../../redux/usersRedux';
import './Ad.scss';


const Ad = () => {
    const { id } = useParams();
    const [ad, setAd] = useState(null);


    const user = useSelector(getUser);
    const navigate = useNavigate();
    console.log(user);
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


    const canEditOrDelete = user && user.login === ad.seller.login;

    console.log('is?', canEditOrDelete)
    const handleEditClick = () => {
        if (canEditOrDelete) {

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
            <h2>Ad details</h2>
            <Col key={ad._id} className='wrapper'>
                <h3 className='pt-2 px-2'>{ad.title}</h3>
                <Row>
                    <Col xs={6}>
                        <img className='ad_img p-2' src={IMGS_URL + ad.photo} alt={ad._id} />
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
                        <p>
                            <span className='caption'>Date</span>
                            {ad.date}
                        </p>
                        <p>
                            <span className='caption'>Price</span>
                            {ad.price}$
                        </p>
                        <p>
                            <span className='caption'>Description</span>
                            {ad.content}$
                        </p>
                        <div className='buttons-wrapper'>
                            {canEditOrDelete && (
                                <Button
                                    className='my-2 mx-3 px-5'
                                    variant='warning'
                                    block
                                    onClick={handleEditClick}
                                >
                                    Edit
                                </Button>
                            )}
                            {canEditOrDelete && (
                                <Button
                                    className='my-2 mx-3 px-5'
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
            <h2>Seller details</h2>
            <Col key={ad.seller._id} className='wrapper'>
                <h3 className='pt-2 px-2'>{ad.seller.login}</h3>
                <Row>
                    <Col xs={6}>
                        <div className='img-container'>
                            <img className='avatar mb-4' src={IMGS_URL + ad.seller.avatar} alt={ad.seller._id} />
                        </div>
                    </Col>
                    <Col xs={6}>
                        <p>
                            <span className='caption'>Phone</span>
                            {ad.seller.phone}
                        </p>
                        <p>
                            <span className='caption'>Login</span>
                            {ad.seller.login}
                        </p>

                    </Col>
                </Row>
            </Col>
        </Container>
    );
};

export default Ad;


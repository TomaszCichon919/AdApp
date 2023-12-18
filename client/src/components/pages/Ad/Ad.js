import { Alert, Container } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { IMGS_URL } from '../../../config'
import { API_URL } from '../../../config';

import { getUser } from '../../../redux/usersRedux';


const Ad = () => {
    const { id } = useParams();
    const [ad, setAd] = useState(null);
console.log(id);

const user = useSelector(getUser);
const navigate = useNavigate();

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
  

    const canEditOrDelete = user &&  user.login === ad.seller;

console.log('is?', canEditOrDelete)
    const handleEditClick = () => {
        if (canEditOrDelete) {
          // Redirect to the edit page for the ad
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
   <Col key={ad._id} xs={8} className='wrapper'>
    <h3 className='pt-2'>{ad.title}</h3>
    <Row>
      <Col xs={6}>
        <div className='img-container'>
          <img className='ad_img' src={IMGS_URL + ad.photo} alt={ad._id} />
        </div>
      </Col>
      <Col xs={6}>
        <p>
          <span className='caption'>Address</span>
          {ad.address}
        </p>
        <p>
          <span className='caption'>Seller</span>
          {ad.seller}
        </p>
        <div className='buttons-container'>
        {canEditOrDelete && (
                <Button
                  className='mb-2 align-self-end'
                  variant='warning'
                  block
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              )}
              {canEditOrDelete && (
                <Button
                  className='mb-2 align-self-end'
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
   
  </Container>
);
};

export default Ad;

// import { useSelector } from 'react-redux';
// import { getPostsById, removePost } from '../../../redux/postsRedux'
// import { useParams } from 'react-router';
// import { Navigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import DateToString from '../../../utils/DateToString/DateToString.js';


// const Post = () => {


//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);



//   const { postId } = useParams();

//   const post = useSelector(state => getPostsById(state, postId));


//   const dispatch = useDispatch();


//   const handleDelete = () => {
//     setShow(false)
//     const string = postId.toString()
//     dispatch(removePost(string));
//   }

//   if (!post) return <Navigate to="/" />




//   return (

//     <section className='px-5'>
//       <div className='d-flex justify-content-between'>
//         <div>
//           <h3 className='py-4'>{post.title}</h3>
//         </div>
//         <div>
//           <Link to={'/post/edit/' + postId} >
//             <Button variant="outline-info" className='mx-2'>Edit</Button>
//           </Link>
//           <Button variant="outline-danger" className='mx-2' onClick={handleShow}>Delete</Button>
//         </div>
//       </div>
//       <p><span className={styles.caption}>Author:</span>{post.author}</p>
//       <p><span className={styles.caption}>Published:</span>{DateToString(post.publishedDate)}</p>
//       <p><span className={styles.caption}>Category:</span>{post.category}</p>
//       <p className='pt-4'dangerouslySetInnerHTML={{ __html: post.content }}/>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Are you sure?</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>The opreation will completly remove the post. The opration can not be reversed.</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="danger" onClick={handleDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </section>
//   );
// };
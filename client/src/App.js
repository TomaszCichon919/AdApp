import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { API_URL } from './config.js'
import { logIn } from '../src/redux/usersRedux.js';
import { useSelector } from 'react-redux';


import MainLayout from './components/layout/MainLayout/MainLayout';

// import routes
import Home from './components/pages/Home/HomePage';
import NotFound from './components/pages/NotFound/NotFoundPage';
import Ad from './components/pages/Ad/Ad.js';
import AdAdd from './components/pages/AdAdd/AdAdd.js';
import AdEdit from './components/pages/AdEdit/AdEdit.js';
import AdRemove from './components/pages/AdRemove/AdRemove.js';
import Search from './components/pages/Search/Search.js';
import Login from './components/pages/Login/Login.js';
import Register from './components/pages/Register/Register.js';
import Logout from './components/pages/Logout/Logout.js';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/user`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const userData = await response.json();
  
          if (Array.isArray(userData.user) && userData.user.length > 0) {
            const user = { login: userData.user[0] };
            dispatch(logIn(user));
          } else {
            console.log('No users found.');
            // Handle the case when no users are available
          }
        } else {
          console.error('Failed to fetch logged-in user');
        }
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };
  
    fetchLoggedInUser();
  }, []); 

  

  const isLoggedIn = useSelector(state => state.user !== null);

return (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ad/:id" element={<Ad />} />
      {/* <Route path="/ad/add">
        {isLoggedIn ? <AdAdd /> : <Navigate to="/login" />}
      </Route> */}
      <Route path="/ad/add" element={<AdAdd />} />
      <Route path="/ad/edit/:id" element={<AdEdit />} />
      <Route path="/ad/remove/:id" element={<AdRemove />} />
      <Route path="/search/:searchPhrase" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route element={<NotFound />} />
    </Routes>
  </MainLayout>
);
};

export default App;


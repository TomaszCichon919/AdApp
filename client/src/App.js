import { Routes, Route } from 'react-router-dom';

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





return (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ad/:id" element={<Ad />} />
      <Route path="/ad/add" element={<AdAdd />} />
      <Route path="/add/edit/:id" element={<AdEdit />} />
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


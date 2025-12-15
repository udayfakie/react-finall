import { FunctionComponent } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import UpdateCard from './UpdateCard';
import Cards from './Cards';
import About from './About';
import Favorite from './Favorite';
import MyCards from './MyCards';
import Sandbox from './Sandbox';
import CreateCard from './CreateCard';
import Pnf from './Pnf';
import Footer from './Footer';

interface LayoutProps {}

const Layout: FunctionComponent<LayoutProps> = () => {
  const location = useLocation();
  const hideFooterRoutes = ['/', '/register'];

  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);
  return (
    <>
      <div className='d-flex flex-column min-vh-100 text-center'>
        <main className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/update-card/:id' element={<UpdateCard />} />
            <Route path='/cards' element={<Cards />} />
            <Route path='/about' element={<About />} />
            <Route path='/fav' element={<Favorite />} />
            <Route path='/my-cards' element={<MyCards />} />
            <Route path='/sandbox' element={<Sandbox />} />
            <Route path='/create-card' element={<CreateCard />} />
            <Route path='*' element={<Pnf />} />
          </Routes>
        </main>
   
        {shouldShowFooter && <Footer />}
      </div>
    </>
  );
};

export default Layout;

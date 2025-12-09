import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Cards from './components/Cards';
import Pnf from './components/Pnf';
import About from './components/About';
import Favorite from './components/Favorite';
import Sendbox from './components/Sendbox';
import CreateCard from './components/CreateCard';
import UpdateCard from './components/UpdateCard';
import MyCards from './components/MyCards';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/update-card/:id' element={<UpdateCard />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/about' element={<About />} />
        <Route path='/fav' element={<Favorite />} />
        <Route path='/my-cards' element={<MyCards  />} />
        <Route path='/sandbox' element={<Sendbox />} />
        <Route path='/create-card' element={<CreateCard />} />
        <Route path='*' element={<Pnf />} />
      </Routes>
    </Router>
  );
}

export default App;

import { FunctionComponent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface NavbarProps {
  setTerm: (str: string) => void;
  setMyCardsTerm: (str: string) => void;
  setFilteredTerm: (str: string) => void;
  
}

const Navbar: FunctionComponent<NavbarProps> = ({ setTerm ,setMyCardsTerm,setFilteredTerm}) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.removeItem('userDetails');
    navigate('/');
  };

  const handleCreateCard = () => {
    navigate('/create-card');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light shadow-sm'>
      <div className='container'>
        <NavLink className='navbar-brand fw-bold' to='/cards'>
          BScard
        </NavLink>


{/* <button
        className="btn btn-outline-secondary"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button> */}


        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/about'>
                About
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/fav'>
                Favorites
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/my-cards'>
                My Cards
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/sandbox'>
                Sandbox
              </NavLink>
            </li>
          </ul>

          <div className='d-flex align-items-center flex-column flex-lg-row gap-2 gap-lg-3'>
            <button
              className='btn btn-primary w-100'
              onClick={handleCreateCard}
            >
              Create Card
            </button>

            <div className='input-group'>
              <input
                type='search'
                className='form-control'
                placeholder='Search'
                aria-label='Search'
                onChange={(e) => {
                  setTerm(e.target.value);
                  setMyCardsTerm(e.target.value);
                  setFilteredTerm(e.target.value);
                }}
              />
              <button className='btn btn-outline-success' type='button'>
                Search
              </button>
            </div>

            <button className='btn btn-outline-danger' onClick={handleLogOut}>
              Logout
            </button>
          </div>
          {/* <i className="fa-regular fa-user fs-4 ms-2"></i> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

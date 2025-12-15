import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <footer className={darkMode ? 'footer-dark' : 'footer-light'}>
      <div className='container'>
        <div className='mb-4 text-center md:text-left'>
          <h2 className={darkMode ? 'text-white' : 'text-dark'}>BCard</h2>
          <p className={darkMode ? 'text-white' : 'text-dark'}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className='d-flex justify-content-center gap-3 m-4'>
          <Link
            to='/cards'
            className={`text-decoration-none ${
              darkMode ? 'text-light' : 'text-dark'
            }`}
          >
            Home
          </Link>
          <Link
            to='/about'
            className={`text-decoration-none ${
              darkMode ? 'text-light' : 'text-dark'
            }`}
          >
            About
          </Link>
          <Link
            to='/my-cards'
            className={`text-decoration-none ${
              darkMode ? 'text-light' : 'text-dark'
            }`}
          >
            My Cards
          </Link>
          <Link
            to='/fav'
            className={`text-decoration-none ${
              darkMode ? 'text-light' : 'text-dark'
            }`}
          >
            Favorite
          </Link>
          <button
            className='btn btn-sm btn-secondary'
            onClick={() => setDarkMode((prev) => !prev)}
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

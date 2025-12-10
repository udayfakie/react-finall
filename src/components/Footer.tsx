import { FunctionComponent } from "react";
import { Link } from "react-router-dom";


interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer className="bg-dark ">
      <div className="container ">
        <div className="mb-4   md:mb-0 text-center md:text-left">
          <h2 className="text-white text-lg font-bold">BCard</h2>
          <p className="text-sm text-white">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

       <div className="d-flex justify-content-center gap-3  ">
          <Link to="/cards" className="text-light text-decoration-none  ">Home</Link>
          <Link to="/about" className="text-light text-decoration-none">About</Link>
          <Link to="/my-cards" className="text-light text-decoration-none">My Cards</Link>
          <Link to="/fav" className="text-light text-decoration-none">Favorite</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

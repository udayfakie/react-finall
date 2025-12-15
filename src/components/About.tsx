import { FunctionComponent } from 'react';
import Navbar from './Navbar';

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <Navbar
        setTerm={() => {
          ('');
        }}
        setMyCardsTerm={() => {
          ('');
        }}
        setFilteredTerm={() => {
          ('');
        }}
      />
      <>
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-10 col-lg-8">
        <div className="card shadow-lg border-0">
          <div className="card-body p-5 text-center">
            <h2 className="mb-4 fw-bold text-primary">
              About Our Business Cards
            </h2>

            <p className="text-muted mb-4">
              A smart and modern way to discover, share, and manage business
              connections — all in one place.
            </p>

            <div className="row text-center mt-4">
              <div className="col-md-4 mb-4">
                <i className="fa-solid fa-id-card fa-2x text-primary mb-3"></i>
                <h5 className="fw-bold">Create Cards</h5>
                <p className="text-muted small">
                  Build professional digital business cards with full contact
                  details and descriptions.
                </p>
              </div>

              <div className="col-md-4 mb-4">
                <i className="fa-solid fa-heart fa-2x text-danger mb-3"></i>
                <h5 className="fw-bold">Save Favorites</h5>
                <p className="text-muted small">
                  Like cards you love and access them anytime from your
                  favorites.
                </p>
              </div>

              <div className="col-md-4 mb-4">
                <i className="fa-solid fa-users fa-2x text-success mb-3"></i>
                <h5 className="fw-bold">Connect Easily</h5>
                <p className="text-muted small">
                  Discover businesses and connect faster without physical cards.
                </p>
              </div>
            </div>

            <hr className="my-4" />

            <p className="text-muted">
              Our platform makes networking simpler, faster, and fully digital —
              helping businesses grow and people connect with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

    </>
  );
};

export default About;

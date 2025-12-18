import { FunctionComponent, useState } from 'react';
import Card from '../interface/Card';
import Swal from 'sweetalert2';
import Navbar from './Navbar';

const Sandbox: FunctionComponent = () => {
  const user = JSON.parse(sessionStorage.getItem('userDetails') || '{}');

  const [demoCard, setDemoCard] = useState<Card>({
    _id: 'sandbox-card',
    title: ' Business Card',
    subtitle: 'Sandbox Card',
    description: 'This is a sandbox card',
    phone: '050-0000000',
    email: 'demo@bcard.com',
    address: {
       state: 'Center',
      city: 'Tel Aviv',
      street: 'Sandbox St',
      houseNumber: 1,
      country: 'Israel',
      zip: 12345,
      
    },
    image: {
      url: 'https://picsum.photos/400/200',
      alt: 'sandbox',
    },
    web: 'https://example.com',
  } );

  const toggleLike = () => {
    if (!user._id) return Swal.fire('Login first');

    setDemoCard((prev) => ({
      ...prev,
      likes: prev.likes?.includes(user._id)
        ? prev.likes.filter((id) => id !== user._id)
        : [...(prev.likes || []), user._id],
    }));
  };

  return (
    <div className="container mt-4">
          <Navbar
          
        setTerm={() => {('')}}
       
        setMyCardsTerm={()=> ''}
        setFilteredTerm={() => {
          ('');
        }}
      />
      <h2 className="text-center mb-4">Sandbox</h2>

      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card text-center">
            <img
              src={demoCard.image.url}
              className="card-img-top"
              style={{ height: 200, objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5>{demoCard.title}</h5>
              <p>{demoCard.description}</p>
              <p>{demoCard.address.city}</p>

              <button className="btn" onClick={toggleLike}>
                <i
                  className={
                    demoCard.likes?.includes(user._id)
                      ? 'fa-solid fa-heart'
                      : 'fa-regular fa-heart'
                  }
                  style={{
                    color: demoCard.likes?.includes(user._id) ? 'red' : 'gray',
                    fontSize: 28,
                  }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Sandbox;

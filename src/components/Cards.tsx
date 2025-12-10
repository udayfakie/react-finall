import { FunctionComponent, useEffect, useState } from 'react';
import { deleteCard, getAllCards } from '../service/cardService';
import Navbar from './Navbar';
import Card from '../interface/Card';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface CardsProps {}

const Cards: FunctionComponent<CardsProps> = () => {
  const [cardsData, setCardsData] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardChanged, setCardChanged] = useState<boolean>(false);
  const [cardsfiltered, setCardsfiltered] = useState<Card[]>(cardsData);
  const [filteredTerm, setFilteredTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllCards()
      .then((res) => {
        setCardsData(res.data);

        setIsLoading(false);

        console.log(res.data);
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err);
      });
  }, [cardChanged]);

  useEffect(() => {
    setCardsfiltered(
      cardsData.filter((card) => card.title.includes(filteredTerm))
    );
  }, [cardsData, filteredTerm]);

  const handleDelete = (cardId: string, cardOwnerId: string) => {
    const token = sessionStorage.getItem('token');
    const userDetailsString = sessionStorage.getItem('userDetails');
    if (!token || !userDetailsString) {
      return Swal.fire('You must be logged in!');
    }
    const userDetails = JSON.parse(userDetailsString);
    if (!userDetails.isAdmin && userDetails._id !== cardOwnerId) {
      return Swal.fire('you are not authorized to delete this card');
    }
    deleteCard(cardId, token)
      .then(() => {
        Swal.fire('card deleted successfully!');
        setCardChanged(!cardChanged);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('failed to delete card');
      });
  };

  return (
    <>
      <Navbar
        setTerm={() => {
          ('');
        }}
        setMyCardsTerm={() => {
          ('');
        }}
        setFilteredTerm={setFilteredTerm}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='container mt-4'>
          <div className='row d-flex justify-content-center'>
            {cardsData.length ? (
              cardsfiltered.map((card, index) => (
                <div
                  key={index}
                  className='col-12 col-md-4 d-flex justify-content-center mb-4'
                >
                  <div className='card text-center' style={{ width: '250px' }}>
                    <img
                      className='card-img-top'
                      src={card.image.url}
                      alt={card.image.alt}
                      style={{
                        height: '200px',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <div className='card-body'>
                      <h5 className='card-title'>{card.title}</h5>
                      <p className='card-text'>{card.subtitle}</p>
                      <p className='card-text'>phone: {card.phone}</p>
                      <p className='card-text'>
                        address: {card.address.street}
                      </p>
                      <div className='d-flex gap-3 justify-content-center'>
                        <i
                          style={{ fontSize: 25 }}
                          className='fa-solid fa-user-xmark text-danger'
                          onClick={async () => {
                            const result = await Swal.fire({
                              title: 'Are you sure?',
                              text: 'This card will be deleted permanently!',
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonText: 'Yes, delete it!',
                              cancelButtonText: 'Cancel',
                            });

                            if (result.isConfirmed) {
                              handleDelete(card._id!, card._id!);
                            }
                          }}
                        ></i>
                        <i
                          style={{ fontSize: 25, color: 'orange' }}
                          className='fa-solid fa-pen-to-square'
                          onClick={() => {
                            navigate(`/update-card/${card._id}`);
                          }}
                        ></i>
                        <i
                          style={{ color: 'red', fontSize: 25 }}
                          className='fa-solid fa-heart'
                        ></i>

                        <i
                          style={{ fontSize: 25 }}
                          className='fa-sharp-duotone fa-solid fa-phone-flip'
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Products</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;

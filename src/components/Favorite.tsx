import { FunctionComponent, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { getAllCards, getMyCards, likeForCard } from '../service/cardService';
import Card from '../interface/Card';
import Swal from 'sweetalert2';

interface FavoriteProps {}

const Favorite: FunctionComponent<FavoriteProps> = () => {
  const [likedCards, setLikedCards] = useState<Card[]>([]);
  const [filteredCardsList, setFilteredCardsList] =
    useState<Card[]>(likedCards);
  const [term, setTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
  useEffect(() => {
  getAllCards().then((res) => {
    const likedOnly = res.data.filter((card: Card) =>
      card.likes?.includes(user._id)
    );
    setLikedCards(likedOnly);
  });
}, []);


  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    getMyCards(token)
      .then((res) => {
        const liked = res.data.filter((card: Card) =>
          card.likes?.includes(user._id)
        );
        setLikedCards(liked);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleLike = async (cardId: string) => {
    const token = sessionStorage.getItem('token');
    if (!token || !user._id) {
      Swal.fire('You must be logged in');
      return;
    }
    try {
      const res = await likeForCard(cardId, token);
      setLikedCards((prev) => prev.filter((c) => c._id !== cardId));
      setFilteredCardsList((prev) => prev.filter((c) => c._id !== cardId));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setFilteredCardsList(
      likedCards.filter((card) => card.title.includes(term))
    );
  }, [likedCards, term]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar
        setTerm={setTerm}
        setMyCardsTerm={() => {
          ('');
        }}
        setFilteredTerm={() => {
          ('');
        }}
      />
      <div className='container mt-4'>
        <h2>My Favorite</h2>
        <div className='row'>
          {likedCards.length > 0 ? (
            filteredCardsList.map((card) => (
              <div className='col-md-4 mb-4' key={card._id}>
                <div className='card h-100 text-center'>
                  <img
                    src={card.image?.url}
                    alt={card.image?.alt || 'Card image'}
                    className='card-img-top mx-auto d-block'
                    style={{
                      height: '200px',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div className='card-body d-flex flex-column justify-content-center'>
                    <h5 className='card-title mb-2'>{card.title}</h5>
                    <p className='card-text mb-2'>{card.description}</p>
                    <p className='card-text mb-1 text-muted'>{card.email}</p>
                    <p className='card-text text-muted'>{card.address.city}</p>
                    <div className='d-flex justify-content-center  gap-3'>
                      <p style={{ color: 'red', fontSize: 30 }}>
                        <i
                          onClick={() => handleLike(card._id as string)}
                          className='fa-solid fa-heart'
                        ></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No favorite cards yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorite;

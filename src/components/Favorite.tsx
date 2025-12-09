import { FunctionComponent, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { getMyCards } from '../service/cardService';
import Card from '../interface/Card';

interface FavoriteProps {}

const Favorite: FunctionComponent<FavoriteProps> = () => {
  const [likedCards, setLikedCards] = useState<Card[]>([]);
  const [filteredCardsList, setFilteredCardsList] =
    useState<Card[]>(likedCards);
    const [term, setTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(sessionStorage.getItem('userDetails') || '{}');

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

  useEffect(() => {
    setFilteredCardsList(
      likedCards.filter((card) => card.title.includes(term))
    );
  }, [likedCards, term]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar setTerm={setTerm} setMyCardsTerm={()=>{''}} setFilteredTerm={()=>{''}}/>
      <div className='container mt-4'>
        <h2>My Favorite</h2>
        <div className='row'>
          {likedCards.length > 0 ? (
            filteredCardsList.map((card) => (
              <div className='col-md-4 mb-4' key={card._id}>
                <div className='card h-100'>
                  <img
                    src={card.image?.url}
                    alt={card.image?.alt || 'Card image'}
                    className='card-img-top'
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{card.title}</h5>
                    <h5 className='card-title'>{card.description}</h5>
                    <p className='card-text'>{card.email}</p>
                    <p className='card-text'>{card.address.city}</p>
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

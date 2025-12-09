import { FunctionComponent, useEffect, useState } from 'react';
import { deleteCard, getMyCards, likeForCard } from '../service/cardService';
import Card from '../interface/Card';
import Navbar from './Navbar';

const MyCards: FunctionComponent = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredCards, setFilteredCards] =
      useState<Card[]>(cards);
    const [myCardsTerm, setMyCardsTerm] = useState<string>('');

  const user = JSON.parse(sessionStorage.getItem('userDetails') || '{}');

  const handleLike = async (cardId: string) => {
    const token = sessionStorage.getItem('token');
    if (!token || !user._id) {
      alert('You must be logged in');
      return;
    }

    try {
      const res = await likeForCard(cardId, token); 
      setCards((prev) =>
        prev.map((card) =>
          card._id === cardId ? { ...card, likes: res.data.likes } : card
        )
      );
    } catch (err) {
      console.error(err);
    }
  };
   useEffect(() => {
    setFilteredCards(
      cards.filter((card) => card.title.includes(myCardsTerm))
    );
  }, [cards, myCardsTerm]);

  const handleDelete = async (cardId: string) => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      alert('You must be logged in');
      return;
    }

    try {
      await deleteCard(cardId, token);
      setCards((prev) => prev.filter((card) => card._id !== cardId));
    } catch (err) {
      console.log(err);
      alert('You cannot delete this card (not owner or not admin)');
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    getMyCards(token)
      .then((res) => {
        setCards(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar setTerm={()=> {''}} setMyCardsTerm={setMyCardsTerm} setFilteredTerm={()=>{''}}/>
      <div className='container mt-4'>
        
        <div className='row'>
          {cards.length > 0 ? (
            filteredCards.map((card) => (
              <div className='col-md-4 mb-4' key={card._id}>
                <div className='card h-100'>
                  <img
                    src={card.image?.url}
                    alt={card.image?.alt || 'Card image'}
                    className='card-img-top'
                  />

                  <div className='card-body'>
                    <h4 className='card-title'>{card.title}</h4>
                    <h5 className='card-title'>{card.description}</h5>
                    <p className='card-text'>{card.address.city}</p>
                    <p className='card-text'>{card.phone}</p>

                    <button
                      className='btn btn-danger'
                      onClick={() => handleDelete(card._id as string)}
                    >
                      Delete
                    </button>
                    <button
                      className={`btn ${
                        card.likes?.includes(user._id)
                          ? 'btn-danger'
                          : 'btn-secondary'
                      } m-2`}
                      onClick={() => {
                        console.log(card.likes);
                        
                        handleLike(card._id as string);
                      }}
                    >
                      {card.likes?.includes(user._id) ? (
                        <i className='fa-solid fa-heart'></i>
                      ) : (
                        <i className='fa-regular fa-heart'></i> 
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No Cards</p>
          )}
        </div>
      </div>

    </>
  );
};

export default MyCards;

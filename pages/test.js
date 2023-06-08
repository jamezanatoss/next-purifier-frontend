import React, { useState } from 'react';

const Product = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    { id: 1, price: 790 },
    { id: 2, price: 890 },
    { id: 3, price: 13900 }
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const cardContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const cardStyles = {
    backgroundColor: '#f7f7f7',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
    width: '200px',
    textAlign: 'center',
    cursor: 'pointer'
  };

  const selectedPriceStyles = {
    marginTop: '20px',
    backgroundColor: '#f7f7f7',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    width: '200px',
    textAlign: 'center'
  };

  const titleStyles = {
    fontSize: '18px',
    marginTop: '0'
  };

  const priceStyles = {
    marginBottom: '0'
  };

  return (
    <div>
      <div style={cardContainerStyles}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={cardStyles}
            onClick={() => handleCardClick(card)}
          >
            <h3 style={titleStyles}>Card {card.id}</h3>
            <p style={priceStyles}>Price: {card.price}</p>
          </div>
        ))}
      </div>
      {selectedCard && (
        <div style={selectedPriceStyles}>
          <h3 style={titleStyles}>Selected Price</h3>
          <p style={priceStyles}>Price: {selectedCard.price}</p>
        </div>
      )}
    </div>
  );
};

export default Product;

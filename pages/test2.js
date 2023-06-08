import React, { useState } from 'react';

const Product = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);

  const cards = [
    { id: 1, price: 790 },
    { id: 2, price: 890 },
    { id: 3, price: 13900 }
  ];

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const cardContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const cardStyles = {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
    width: '200px',
    textAlign: 'center',
    cursor: 'pointer',
    color: 'black'
  };

  const selectedCardStyles = {
    ...cardStyles,
    border: '1px solid blue',
    backgroundColor: 'white',
    color: 'black'
  };

  const titleStyles = {
    fontSize: '18px',
    marginTop: '0'
  };

  const priceStyles = {
    marginBottom: '0'
  };

  return (
    <div style={cardContainerStyles}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          style={selectedCardIndex === index ? selectedCardStyles : cardStyles}
          onClick={() => handleCardClick(index)}
        >
          <h3 style={titleStyles}>Card {card.id}</h3>
          <p style={priceStyles}>Price: {card.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Product;

import React, { useState } from 'react';

export default function PriceAll(product) {
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);

  let p = product.product;
  //product.price = {p};
//   console.log(product.price)
  let prices = product.price;
//   console.log(product.price)
  let cards = [];
  if(p == '64572cc0c00f1970b94d1858'){
   cards = [
    { id: 1, price: 790 },
    { id: 2, price: 890 },
    { id: 3, price: 13900 }
  ];
}

else if(p == '64572cc0c00f1970b94d1858'){
    cards = [
     { id: 1, price: 790 },
     { id: 2, price: 890 },
     { id: 3, price: 13900 }
   ];
 }

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
    if(prices == 39800){
        prices = cards[index].price;
        //product.price = prices;
        console.log(prices);
    }
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
    border: '2px solid blue',
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


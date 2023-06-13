import React, { useState } from 'react';

export default function PriceAll(product) {
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [selectedItems, setSelectedItems] = useState([]);

  let p = product.product;
  //product.price = {p};
  // console.log(product.price[0])
  let prices = product.price;
  //   console.log(product.price)
  let cards = [];

  let i = 0;

  if (p == '64572cc0c00f1970b94d1858') {

    for (i = 0; i < prices.length; i++) {
      cards[i] = [
        { id: i, price: prices[i] },
      ];
    }
  }


  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
    // prices = cards[index].price;
    console.log(index);

    // const product = cards.find((p) => p.id === productId);
    // if (product) {
    //   const selectedPrice = product.price[priceIndex];
    //   cards.push({ ...product, prices: selectedPrice });
    // }
  };

  // const addToCart = (index,productId) => {
  //   setSelectedCardIndex(index);
  //   prices = cards[index].price;
  //   // console.log(price);
  //   const product = cards.find((p) => p.id === productId);

  //   // if (product) {
  //   //     const selectedPrice = product.prices[index];
  //   //     cards.push({ ...product, prices: selectedPrice });
  //   // }

  // };

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

  // const addToCart = (productId, priceIndex) => {
  //   const product = cards.find((p) => p.id === productId);

  //   if (product) {
  //       const selectedPrice = product.price[priceIndex];
  //       cart.push({ ...product, prices: selectedPrice });
  //   }
  // };

  return (
    <div style={cardContainerStyles}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          style={selectedCardIndex === index ? selectedCardStyles : cardStyles}
          onClick={() => handleCardClick(prices[index])}
        >
          <h3 style={titleStyles}>Card {index + 1}</h3>
          <p style={priceStyles}>Price: {prices[index]}</p>
        </div>

      ))
      }
    </div>

  );
};




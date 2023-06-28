import styled from "styled-components";
import { ButtonStyle } from "@/components/Button";
import { primary } from "@/lib/colors";
import { CartContext } from "@/components/CartContext";
import { useContext, useEffect, useRef, useState } from "react";
import PriceAll from "./Neoplus/PriceAll";


const FlyingButtonWrapper = styled.div`
  button{
    ${ButtonStyle};
    ${props => props.main ? `
      background-color: ${primary};
      color:white;
    ` : `
      background-color: transparent;
      border: 1px solid ${primary};
      color:${primary};
    `}
    ${props => props.white && `
      background-color: white;
      border: 1px solid white;
      font-weight:500;
    `}
  }
  @keyframes fly{
    100%{
      top:0;
      left:65%;
      opacity: 0;
      display:none;
      max-width: 50px;
      max-height: 50px;
    }
  }
  img{
    display:none;
    max-width: 120px;
    max-height: 120px;
    opacity: 1;
    position: fixed;
    z-index: 5;
    animation: fly 1s;
    border-radius: 10px;
  }
`;


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


export default function FlyingButton(props) {
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const { addProduct } = useContext(CartContext);
  const imgRef = useRef();

  function sendImageToCart(ev) {
    imgRef.current.style.display = 'inline-block';
    imgRef.current.style.left = (ev.clientX - 50) + 'px';
    imgRef.current.style.top = (ev.clientY - 50) + 'px';
  }

  function handleCardClick(price) {
    setSelectedCardIndex(price);
    setSelectedPrice(cardss[price].price);
  }

  function addToCart() {
    addProduct(props._id, selectedPrice);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef.current?.closest('div[data-sr-id]');
      if (reveal?.style.opacity === '1') {
        // visible
        reveal.style.transform = 'none';
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  let i = 0;
  let pricess = 0;
  const cardss = [];
  let prices = props.price;

  if (props._id) {
    for (let j = 1; j <= prices.length; j++) {
      cardss.push({ id: j, price: prices[j - 1] });
    }
  }

  return (
    <>
      <div style={cardContainerStyles}>
        {cardss.map((card, index) => (
          <div
          key={card.id}
          style={selectedCardIndex === card.id - 1 ? selectedCardStyles : cardStyles}
          onClick={() => handleCardClick(card.id - 1)}
        >
          <h3 style={titleStyles}>ราคาสำหรับสัญญา {card.id} ปี </h3>
          <p style={priceStyles}>ราคา: {card.price} บาท</p>
        </div>
        ))}
        <FlyingButtonWrapper white={props.white} main={props.main}>
          <img src={props.src} alt="" ref={imgRef} />
          {/* <button onClick={ev => sendImageToCart(ev)} {...props} /> */}
          <button onClick={addToCart}>รถเข็น</button>
        </FlyingButtonWrapper>
        
      </div>
    </>
  );
}




import styled, { css } from "styled-components";
import React from "react";

const StyledOrder = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  gap: 20px;
  align-items: center;
  time {
    font-size: 1rem;
    color: #555;
  }
  ${({ delivered }) =>
  delivered &&
  css`
    .status {
      color: green;
    }
  `}
`;


const ProductRow = styled.div`
  span{
    color:#aaa;
  }
`;

const Address = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  margin-top: 5px;
  color: #888;
`;

const RemoveButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

export default function SingleOrder({ line_items, createdAt, name, email, streetAddress, postalCode, city, phone,status,onRemove}) {
  let statusLabel;
  let delivered = false;

  if (status === 'waiting') {
    statusLabel = 'รอชำระ';
  } 

  else if (status === 'delivery') {
    statusLabel = 'กำลังจัดส่ง';
  } 
  else if (status === 'shipped'){
    statusLabel = 'จัดส่งแล้ว';
    delivered = true;
  }
    else {
    statusLabel = status;
  }

  const handleRemoveOrder = () => {
    onRemove();
  };

  return (
    
    <StyledOrder delivered={delivered}>
      <div>
      
        <time>{new Date(createdAt).toLocaleString("sv-SE")}</time>
        <Address>
          {name}
          <br />
          {email}
          <br />
          {streetAddress}
          <br />
          {postalCode} {city}, {phone}
        </Address>
      </div>
      <div>
      {line_items.map(item => (
          <ProductRow key={item.id}>
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}    
          </ProductRow>
        ))
        }
      </div>
      <div>
        {status === "waiting" ? (
          <div>{statusLabel}
          <RemoveButton onClick={handleRemoveOrder} >Remove</RemoveButton></div>
        ) : (
          <div>{statusLabel}</div>
        )}
      </div>
    </StyledOrder>
    
  );
}


// import styled from "styled-components";

// const StyledOrder = styled.div`
//   margin: 10px 0;
//   padding: 10px 0;
//   border-bottom: 1px solid #ddd;
//   display: flex;
//   gap: 20px;
//   align-items: center;
//   time {
//     font-size: 1rem;
//     color: #555;
//   }
// `;

// const Address = styled.div`
//   font-size: 0.8rem;
//   line-height: 1rem;
//   margin-top: 5px;
//   color: #888;
// `;

// export default function SingleOrder({ line_items, createdAt, name, email, streetAddress, postalCode, city, country }) {
//   return (
//     <StyledOrder>
//       <div>
//         <time>{new Date(createdAt).toLocaleString("sv-SE")}</time>
//         <Address>
//           {name}
//           <br />
//           {email}
//           <br />
//           {streetAddress}
//           <br />
//           {postalCode} {city}, {country}
//         </Address>
//       </div>
//       <div>
//         {line_items ? (
//           <SingleOrder
//             line_items={line_items}
//             createdAt={createdAt}
//             name={name}
//             email={email}
//             streetAddress={streetAddress}
//             postalCode={postalCode}
//             city={city}
//             country={country}
//           />
//         ) : (
//           <p>No line items available for this order.</p>
//         )}
//       </div>
//     </StyledOrder>
//   );
// }

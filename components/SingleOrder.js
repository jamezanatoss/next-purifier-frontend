import styled from "styled-components";

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

export default function SingleOrder({ line_items, createdAt, name, email, streetAddress, postalCode, city, country,status}) {
  return (
    <StyledOrder>
      <div>
        <time>{new Date(createdAt).toLocaleString("sv-SE")}</time>
        <Address>
          {name}
          <br />
          {email}
          <br />
          {streetAddress}
          <br />
          {postalCode} {city}, {country}
        </Address>
      </div>
      <div>
      {line_items.map(item => (
          <ProductRow>
            {console.log("item",line_items)}
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}    
          </ProductRow>
        ))
        }
      </div>
      สถานะ: {status}
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

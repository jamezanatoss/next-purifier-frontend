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

  .status-wrapper {
    width: 80px;
  }

  .status {
    /* Default color for status */
    color: red;
  }

  .status.delivery {
    color: black;
  }

  .status.shipped {
    color: blue;
  }

  .status.installed {
    color: green;
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
  span {
    color: #aaa;
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

export default function SingleOrder({
  _id,
  line_items,
  createdAt,
  name,
  email,
  streetAddress,
  postalCode,
  city,
  phone,
  status,
  onRemove,
}) {
  let statusLabel;
  let delivered = false;

  if (status === "waiting") {
    statusLabel = "รอชำระ";
  } else if (status === "delivery") {
    statusLabel = "กำลังจัดส่ง";
  } else if (status === "shipped") {
    statusLabel = "จัดส่งแล้ว";
    delivered = true;
  } else if (status === "installed") {
    statusLabel = "ติดตั้งแล้ว";
    delivered = true;
  } else {
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
          ID:{_id}
          <br />
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
        {line_items.map((item) => (
          <ProductRow key={item.id}>
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
      <div>
        {status === "waiting" ? (
          <div className="status-wrapper">
            <span className="status">{statusLabel}</span>
            <RemoveButton onClick={handleRemoveOrder}>Remove</RemoveButton>
          </div>
        ) : (
          <div className="status-wrapper">
            <span className={`status ${status}`}>{statusLabel}</span>
          </div>
        )}
      </div>
    </StyledOrder>
  );
}

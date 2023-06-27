import React from "react";
import SingleOrder from "./SingleOrder";

export default function OrderList({ orders, onRemoveOrder }) {
    const handleRemoveOrder = (orderId) => {
        console.log("orderID",orderId)
        onRemoveOrder(orderId);
    };

    return (
        <div>
            {orders.map((order) => {
                return (
                    <SingleOrder
                        key={order._id}
                        line_items={order.line_items}
                        createdAt={order.createdAt}
                        name={order.name}
                        email={order.email}
                        streetAddress={order.streetAddress}
                        postalCode={order.postalCode}
                        city={order.city}
                        phone={order.phone}
                        status={order.status}
                        paid={order.paid}
                        onRemove={() => handleRemoveOrder(order._id)}
                    />
                );
            })}
        </div>
    );
}


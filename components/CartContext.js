// import { createContext, useEffect, useState } from "react";

// export const CartContext = createContext({});

// export function CartContextProvider({ children }) {
//   const ls = typeof window !== "undefined" ? window.localStorage : null;
//   const [cartProducts, setCartProducts] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [cartLength, setCartLength] = useState(totalCount); // Initialize cartLength with totalCount

//   useEffect(() => {
//     if (cartProducts?.length > 0) {
//       ls?.setItem("cart", JSON.stringify(cartProducts));
//     }
//   }, [cartProducts]);

//   useEffect(() => {
//     if (ls && ls.getItem("cart")) {
//       const storedCartProducts = JSON.parse(ls.getItem("cart"));
//       setCartProducts(storedCartProducts);
//       setTotalCount(calculateTotalCount(storedCartProducts)); // Calculate totalCount based on the stored cart products
//     } else {
//       setCartProducts([]);
//       setTotalCount(0); // If there's no data in local storage, set the initial totalCount to 0
//     }
//   }, []);

//   useEffect(() => {
//     const count = calculateTotalCount(cartProducts); // Calculate the totalCount from the cartProducts

//     // Check if the cartProducts array is empty or the stored cart in local storage is empty
//     if (cartProducts.length === 0 || (ls && !ls.getItem("cart"))) {
//       setTotalCount(0); // If the cart is empty, set the totalCount to 0
//     } else {
//       setTotalCount(count); // Otherwise, set the totalCount based on the count
//     }
//   }, [cartProducts, ls]);

//   function calculateTotalCount(products) {
//     return products.reduce((total, item) => total + item.count, 0);
//   }

//   function addProduct(productId, productPrice) {
//     const existingItem = cartProducts.find(
//       item => item.productId === productId && item.price === productPrice
//     );

//     if (existingItem) {
//       const updatedCartProducts = cartProducts.map(item => {
//         if (item.productId === productId && item.price === productPrice) {
//           return {
//             ...item,
//             count: item.count + 1
//           };
//         }
//         return item;
//       });

//       setCartProducts(updatedCartProducts);
//     } else {
//       const newItem = {
//         productId: productId,
//         price: productPrice,
//         count: 1
//       };

//       setCartProducts(prev => [...prev, newItem]);
//     }
//   }

//   function removeProduct(productId, productPrice) {
//     setCartProducts(prev => {
//       const updatedCart = prev.filter(
//         item => !(item.productId === productId && item.price === productPrice)
//       );
//       return updatedCart;
//     });
//   }

//   function clearCart() {
//     setCartProducts([]);
//   }

//   return (
//     <CartContext.Provider
//       value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart, totalCount }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [cartLength, setCartLength] = useState(totalCount); // Initialize cartLength with totalCount

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      const storedCartProducts = JSON.parse(ls.getItem("cart"));
      setCartProducts(storedCartProducts);
      setTotalCount(calculateTotalCount(storedCartProducts)); // Calculate totalCount based on the stored cart products
    } else {
      setCartProducts([]);
      setTotalCount(0); // If there's no data in local storage, set the initial totalCount to 0
    }
  }, []);

  useEffect(() => {
    const count = calculateTotalCount(cartProducts); // Calculate the totalCount from the cartProducts

    // Check if the cartProducts array is empty or the stored cart in local storage is empty
    if (cartProducts.length === 0 || (ls && !ls.getItem("cart"))) {
      setTotalCount(0); // If the cart is empty, set the totalCount to 0
    } else {
      setTotalCount(count); // Otherwise, set the totalCount based on the count
    }
  }, [cartProducts, ls]);

  useEffect(() => {
    // Clear the cart data when the user logs out
    if (!ls && cartProducts.length > 0) {
      clearCart();
    }
  }, [ls]);

  function calculateTotalCount(products) {
    return products.reduce((total, item) => total + item.count, 0);
  }

  function addProduct(productId, productPrice) {
    const existingItem = cartProducts.find(
      item => item.productId === productId && item.price === productPrice
    );

    if (existingItem) {
      const updatedCartProducts = cartProducts.map(item => {
        if (item.productId === productId && item.price === productPrice) {
          return {
            ...item,
            count: item.count + 1
          };
        }
        return item;
      });

      setCartProducts(updatedCartProducts);
    } else {
      const newItem = {
        productId: productId,
        price: productPrice,
        count: 1
      };

      setCartProducts(prev => [...prev, newItem]);
    }
  }

  function removeProduct(productId, productPrice) {
    setCartProducts(prev => {
      const updatedCart = prev.filter(
        item => !(item.productId === productId && item.price === productPrice)
      );
      return updatedCart;
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart, totalCount }}
    >
      {children}
    </CartContext.Provider>
  );
}



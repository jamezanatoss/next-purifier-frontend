import {createContext, useEffect, useState} from "react";
import mongoose from "mongoose";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts,setCartProducts] = useState([]);
  const [cartLength, setCartLength] = useState(cartProducts.length);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  useEffect(() => {
    setCartLength(cartProducts.length);
  }, [cartProducts]);

  // function addProduct(productId, productPrice) {
  //   console.log("productId",productId);
  //   console.log("productPrice",productPrice);
  //   const newItem = {
  //     productId: productId, 
  //     price: productPrice,
  //   };
  //   console.log("newItem", typeof newItem)
  //   setCartProducts(prev => [...prev, newItem]);
  // }

  function addProduct(productId, productPrice, productPart) {
    const newItem = {
      productId: productId,
      price: productPrice,
      part: productPart
    };
    setCartProducts(prev => [...prev, newItem]);
  }
  
  
  function removeProduct(productId, productPrice) {
    setCartProducts(prev => {
      const updatedCart = prev.filter(item => !(item.productId === productId && item.price === productPrice));
      return updatedCart;
    });
  }
  
  
  
  //   if (existingProduct) {
  //     // If the product with the same price exists, update its count
  //     const updatedProducts = cartProducts.map((item) => {
  //       if (item.productId === productId && item.price === productPrice) {
  //         return {
  //           ...item,
  //           count: item.count + 1,
  //         };
  //       }
  //       return item;
  //     });
  //     setCartProducts(updatedProducts);
  //   } else {
  //     // If the product with the same price doesn't exist, add it as a new item
  //     const newItem = {
  //       productId: productId,
  //       price: productPrice,
  //       count: 1, // Set the initial count to 1
  //     };
  //     setCartProducts((prev) => [...prev, newItem]);
  //   }
  // }

  // function removeProduct(productId, productPrice) {
  //   setCartProducts(prev => {
  //     const updatedCart = [...prev];
  //     const itemIndex = updatedCart.findIndex(item => item.productId === productId && item.price === productPrice);
  //     if (itemIndex !== -1) {
  //       if (updatedCart[itemIndex].count === 1) {
  //         updatedCart.splice(itemIndex, 1); // Remove the item if count is 1
  //       } else {
  //         updatedCart[itemIndex].count -= 1; // Subtract one from the count
  //       }
  //     }
  //     return updatedCart;
  //   });
  // }

  
  function clearCart() {
    setCartProducts([]);
  }
  return (
    <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>
      {children}
    </CartContext.Provider>
  );
}
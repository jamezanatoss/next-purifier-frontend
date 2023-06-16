import {createContext, useEffect, useState} from "react";
import mongoose from "mongoose";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts,setCartProducts] = useState([]);

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

  function addProduct(productId, productPrice) {
    console.log("productId",productId);
    console.log("productPrice",productPrice);
    const newItem = {
      //_id: mongoose.Types.ObjectId(),
      productId: productId, 
      price: productPrice,
    };
    console.log("newItem",newItem)
    setCartProducts(prev => [...prev, newItem]);
  }

  function removeProduct(productId, productPrice) {
    setCartProducts(prev => {
      return prev.filter(item => item.productId !== productId || item.productPrice !== productPrice);
    });
  }

  
  function clearCart() {
    setCartProducts([]);
  }
  return (
    <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>
      {children}
    </CartContext.Provider>
  );
}
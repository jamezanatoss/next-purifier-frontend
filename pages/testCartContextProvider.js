// export function CartContextProvider({ children }) {
//     const ls = typeof window !== "undefined" ? window.localStorage : null;
//     const [cartProducts, setCartProducts] = useState([]);
  
//     useEffect(() => {
//       if (cartProducts?.length > 0) {
//         ls?.setItem("cart", JSON.stringify(cartProducts));
//       }
//     }, [cartProducts]);
  
//     useEffect(() => {
//       if (ls && ls.getItem("cart")) {
//         setCartProducts(JSON.parse(ls.getItem("cart")));
//       }
//     }, []);
  
//     function addProduct(productId) {
//       setCartProducts((prev) => {
//         const productIndex = prev.findIndex((item) => item.productId === productId);
//         if (productIndex !== -1) {
//           const updatedProducts = [...prev];
//           updatedProducts[productIndex].count += 1;
//           return updatedProducts;
//         } else {
//           return [...prev, { productId, count: 1 }];
//         }
//       });
//     }
  
//     function removeProduct(productId) {
//       setCartProducts((prev) => {
//         const productIndex = prev.findIndex((item) => item.productId === productId);
//         if (productIndex !== -1) {
//           const updatedProducts = [...prev];
//           if (updatedProducts[productIndex].count === 1) {
//             updatedProducts.splice(productIndex, 1);
//           } else {
//             updatedProducts[productIndex].count -= 1;
//           }
//           return updatedProducts;
//         } else {
//           return prev;
//         }
//       });
//     }
  
//     function clearCart() {
//       setCartProducts([]);
//     }
  
//     return (
//       <CartContext.Provider
//         value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}
//       >
//         {children}
//       </CartContext.Provider>
//     );
//   }

//   let productsTotal = 0;

// for (const product of cartProducts) {
//   const matchedProduct = products.find((p) => p._id === product.productId);
//   if (matchedProduct) {
//     const price = matchedProduct.price[count];
//     productsTotal += price * product.count;
//   }
// }

// // Use the productsTotal value in your component






//separate

// function addProduct(productId, productPrice) {
//     setCartProducts((prev) => {
//       const existingProductIndex = prev.findIndex(
//         (item) => item.productId === productId && item.productPrice === productPrice
//       );
//       if (existingProductIndex !== -1) {
//         const updatedProducts = [...prev];
//         updatedProducts[existingProductIndex].count += 1;
//         return updatedProducts;
//       } else {
//         return [...prev, { productId, productPrice, count: 1 }];
//       }
//     });
//   }
  
//   function removeProduct(productId, productPrice) {
//     setCartProducts((prev) => {
//       const existingProductIndex = prev.findIndex(
//         (item) => item.productId === productId && item.productPrice === productPrice
//       );
//       if (existingProductIndex !== -1) {
//         const updatedProducts = [...prev];
//         if (updatedProducts[existingProductIndex].count === 1) {
//           updatedProducts.splice(existingProductIndex, 1);
//         } else {
//           updatedProducts[existingProductIndex].count -= 1;
//         }
//         return updatedProducts;
//       } else {
//         return prev;
//       }
//     });
//   }



//cart js 
// {products.map((product) => (
//     <tr key={product.productId}>
//       <ProductInfoCell>
//         <ProductImageBox>
//           <img src={product.images[0]} alt="" />
//         </ProductImageBox>
//         {product.title}
//       </ProductInfoCell>
//       <td>
//         {cartProducts
//           .filter((item) => item.productId === product.productId)
//           .map((item) => (
//             <div key={`${product.productId}-${item.productPrice}`}>
//               <Button onClick={() => lessOfThisProduct(product.productId, item.productPrice)}>-</Button>
//               <QuantityLabel>{item.count}</QuantityLabel>
//               <Button onClick={() => moreOfThisProduct(product.productId, item.productPrice)}>+</Button>
//               &nbsp;({item.productPrice}&nbsp;บาท)
//             </div>
//           ))}
//       </td>
//       <td>
//         {cartProducts
//           .filter((item) => item.productId === product.productId)
//           .reduce((total, item) => total + item.count * item.productPrice, 0)}
//         &nbsp;บาท
//       </td>
//     </tr>
//   ))}
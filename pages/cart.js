import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";

import mongoose from "mongoose";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2){
    text-align: right;
  }
  table tr.subtotal td{
    padding: 15px 0;
  }
  table tbody tr.subtotal td:nth-child(2){
    font-size: 1.4rem;
  }
  tr.total td{
    font-weight: bold;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  button{padding:0 !important;}
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 6px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const a = styled.a`
  display: block;
  color: #007FFF;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);
  const [cartProductss, setCartProductss] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          const updatedProducts = response.data.map(product => {
            return {
              ...product,
              count: cartProducts.find(item => item.productId === product._id)?.count || 0
            };
          });
          setProducts(updatedProducts);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get('/api/settings?name=shippingFee').then(res => {
      setShippingFee(res.data.value);
    })
  }, []);
  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get('/api/address').then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
    });
  }, [session]);

  function moreOfThisProduct(productId, productPrice) {
    const updatedCartProducts = [...cartProducts];
    const existingProductIndex = updatedCartProducts.findIndex(
      item => item.productId === productId && item.price === productPrice
    );

    if (existingProductIndex !== -1) {
      updatedCartProducts[existingProductIndex].count += 1; // Increment the quantity of the existing product
      setCartProductss(updatedCartProducts);
    }
  }
  function lessOfThisProduct(productId, productPrice) {
    const updatedCartProducts = [...cartProducts];
    const existingProductIndex = updatedCartProducts.findIndex(
      item => item.productId === productId && item.price === productPrice
    );

    if (existingProductIndex !== -1) {
      const existingProduct = updatedCartProducts[existingProductIndex];
      if (existingProduct.count === 1) {
        updatedCartProducts.splice(existingProductIndex, 1); // Remove the product if the quantity is 1
      } else {
        existingProduct.count -= 1; // Decrement the quantity of the existing product
      }
      setCartProductss(updatedCartProducts);
    }
  }


  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name, email, city, postalCode, streetAddress, country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  const productsTotal = cartProducts.reduce((total, item) => {
    const product = products.find((p) => p._id === item.productId);
    if (product) {
      const price = product.price[item.count - 1];
      return total + price * item.count;
    }
    return total;
  }, 0);

  console.log("Total:", productsTotal);

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <Box>
              <h2>รถเข็น</h2>
              {!cartProducts?.length && (
                <div>ยังไม่มีรถเข็น</div>
              )}
              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      cartProducts.map((item) => {
                        const product = products.find((p) => p._id === item.productId);

                        if (product) {
                          return (
                            <tr key={item.productId}>
                              <ProductInfoCell>
                                <ProductImageBox>
                                  <img src={product.images[0]} alt="" />
                                </ProductImageBox>
                                {product.title}
                              </ProductInfoCell>
                              <td>
                                <div>
                                  <Button onClick={() => lessOfThisProduct(item.productId, item.price)}>
                                    -
                                  </Button>
                                  <QuantityLabel>{item.count}</QuantityLabel>
                                  <Button onClick={() => moreOfThisProduct(item.productId, item.price)}>
                                    +
                                  </Button>
                                </div>
                              </td>
                              <td>{item.price}&nbsp;บาท</td>
                            </tr>
                          );
                        }
                        return null;
                      })
                    }
                    <tr className="subtotal">
                      <td colSpan={2}>ราคาสินค้า</td>
                      <td>{productsTotal}&nbsp;บาท</td>
                    </tr>
                    <tr className="subtotal">
                      <td colSpan={2}>ค่าส่ง</td>
                      <td>{shippingFee}&nbsp;บาท</td>
                    </tr>
                    <tr className="subtotal total">
                      <td colSpan={2}>ราคารวม</td>
                      <td>{productsTotal + parseInt(shippingFee || 0)}&nbsp;บาท</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
          </RevealWrapper>
          {!!cartProducts?.length && (
            <RevealWrapper delay={100}>
              <Box>
                <h2>ข้อมูลก่อนจัดส่ง</h2>
                <Input type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={ev => setName(ev.target.value)} />
                <Input type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={ev => setEmail(ev.target.value)} />
                <CityHolder>
                  <Input type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={ev => setCity(ev.target.value)} />
                  <Input type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    name="postalCode"
                    onChange={ev => setPostalCode(ev.target.value)} />
                </CityHolder>
                <Input type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={ev => setStreetAddress(ev.target.value)} />
                <Input type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={ev => setCountry(ev.target.value)} />
                <input type="checkbox" id="" name="" value=""></input>ฉันยอมรับ&nbsp;
                <a class="" href="/" style={{ textDecoration: "none", color: "#007FFF" }}>ข้อตกลงและเงื่อนไข</a>&nbsp;และ&nbsp;
                <a class="" href="/" style={{ textDecoration: "none", color: "#007FFF" }}>นโยบายความเป็นส่วนตัว</a>
                <Button black block
                  onClick={goToPayment}>
                  ชำระเงิน
                </Button>
              </Box>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
      <Footer />
    </>
  );
}

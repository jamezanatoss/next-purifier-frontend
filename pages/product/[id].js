import React, { useState } from 'react';
import Center from "@/components/Center";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import Neoplus from "@/components/Neoplus/Neoplus";
import PriceAll from "@/components/Neoplus/PriceAll";
//import ProductReviews from "@/components/ProductReviews";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;


export default function ProductPage({ product }) {
  // let priceArray = []
  // if(product.price == 39800){
  //   priceArray[0] = 690;
  //   priceArray[1] = 790;
  //   priceArray[2] = 39800;  
  // }

  // console.log(priceArray)

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>
              {product.title}</Title>
            <p>ตัวเลือกบริการ</p>
            <p>{product.description}</p>
            <PriceRow>
              {/* <div>
                {<Price>{product.price}&nbsp;บาท</Price>}
              </div> */}
             <div>
                {<PriceAll product={product._id} price={product.price}>&nbsp;บาท</PriceAll>}
              </div>
              <div>
                <FlyingButton main _id={product._id} price={product.price}>
                  <CartIcon />รถเข็น
                </FlyingButton>
              </div>
            </PriceRow>
          </div>



        </ColWrapper>
        <Neoplus product={product._id} price={product.price} title={product.title} />
        {/* <ProductReviews product={product} /> */}
      </Center>
      <Footer />

    </>

  )

}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}
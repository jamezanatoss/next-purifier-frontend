import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import Neoplus from "@/components/Neoplus/Neoplus";
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
const Card = styled.div`

`;


export default function ProductPage({ product }) {
  let priceArray = []
  if(product.price == 39800){
    priceArray[0] = 690;
    priceArray[1] = 790;
    priceArray[2] = 39800;  
  }

  console.log(priceArray)
  
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
              <div>
                <Price>{priceArray[0]}&nbsp;บาท</Price><br />
                <Price>{priceArray[1]}&nbsp;บาท</Price><br />
                <Price>{priceArray[2]}&nbsp;บาท</Price><br />
              </div>
              <div>
                <FlyingButton main _id={product._id} >
                  <CartIcon />รถเข็น
                </FlyingButton>
                <FlyingButton main _id={product._id}>
                  <CartIcon />รถเข็น
                </FlyingButton>
                <FlyingButton main _id={product._id} >
                  <CartIcon />รถเข็น
                </FlyingButton>
              </div>
            </PriceRow>
          </div>



        </ColWrapper>
        <Neoplus product={product._id} price={product.price} title={product.title} />
        {/* <ProductReviews product={product} /> */}
      </Center>

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
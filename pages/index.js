import Center from "@/components/Center";
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";

export default function HomePage({featuredProduct,newProducts}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '64572cc0c00f1970b94d1858';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}



// export async function getServerSideProps() {
//   const featuredProductId = '64488e0b8caa9095ce96d059';
//   await mongooseConnect();
//   const product = await Product.findById(featuredProductId);
//   console.log("ss",product);
//  // const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
//   return {
//     props: {product: JSON.parse(JSON.stringify(product))},
//       // featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
//       // newProducts: JSON.parse(JSON.stringify(newProducts)),
    
//   };
// }


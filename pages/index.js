import Center from "@/components/Center";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Featured from "@/components/Featured";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import {Setting} from "@/models/Setting";
import {WishedProduct} from "@/models/WishedProduct";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Center>
      <style jsx>{`
        /* Define your CSS styles here */

        /* ... */

        .section {
          padding: 2rem;
          background-color: #f7f7f7;
          text-align: center;
        }

        .section-title {
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .section-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }

        .service-card,
        .blog-post-card {
          width: 300px;
          padding: 1rem;
          background-color: #ada3a3d0;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 3rem;
          text-align: left;
          opacity: 0.8;

        }

        .service-card h3,
        .blog-post-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .service-card p,
        .blog-post-card p {
          color: #666;
        }

        .footer {
          padding: 2rem;
          background-color: #333;
          color: #fff;
          text-align: center;
        }

        .footer p {
          margin-bottom: 0;
        }
      `}</style>

      <div className="container">
        <section className="section">
          <h2 className="section-title" >บริการของเรา</h2>
          <div className="section-content">
            <div className="service-card">
              <h3>Service 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="service-card">
              <h3>Service 2</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="service-card">
              <h3>Service 2</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="service-card">
              <h3>Service 2</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          
        </section>

        <section className="section">
          <h2 className="section-title">บทความ</h2>
          <div className="section-content">
            <div className="blog-post-card">
              <h3>Blog Post 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="blog-post-card">
              <h3>Blog Post 2</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="blog-post-card">
              <h3>Blog Post 3</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="blog-post-card">
              <h3>Blog Post 4</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">ลูกค้าของเรา</h2>
          <div className="section-content">
            <div className="blog-post-card">
              <h3>ลูกค้า 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="blog-post-card">
              <h3>ลูกค้า 2</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="blog-post-card">
              <h3>ลูกค้า 3</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="blog-post-card">
              <h3>ลูกค้า 4</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </section>
      </div>

      </Center>
      <Footer />

      

      {/* <Featured product={featuredProduct} /> */}
      {/* <NewProducts products={newProducts} wishedProducts={wishedNewProducts} /> */}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const featuredProductSetting = await Setting.findOne({name:'featuredProductId'});
  const featuredProductId = featuredProductSetting.value;
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
        userEmail:session.user.email,
        product: newProducts.map(p => p._id.toString()),
      })
    : [];
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map(i => i.product.toString()),
    },
  };
}




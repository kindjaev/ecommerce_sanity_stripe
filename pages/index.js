import { Product, FooterBanner, HeroBanner } from "../components"
import { client } from "../lib/client"

export const getServerSideProps = async () => {
  const productQuery = "*[_type == 'product']"
  const productData = await client.fetch(productQuery)

  const bannerQuery = "*[_type == 'banner']"
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {productData, bannerData}
  }
}
export default function Home({ productData, bannerData }) {
  return (
   <>
    <HeroBanner bannerData={bannerData && bannerData[1]} />

    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div className="products-container">
      {productData?.map(product => <Product key={product._id} product={product} />)}
    </div>

    <FooterBanner bannerData ={bannerData && bannerData[0]}/>
   </>
  )
}


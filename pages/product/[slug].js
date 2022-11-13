import {useState} from 'react'
import {client, urlFor} from "../../lib/client"
import { useStateContext } from '../../context/StateContext'

import {AiOutlineMinus, AiOutlinePlus, AiOutlineStar, AiFillStar} from 'react-icons/ai'
import Product from '../../components/Product'
// import FallbackPage from '../../components/FallbackPage'


export const getStaticPaths = async () => {
    const productQuery = `*[_type == "product"] {
        slug {
            current
        }
    }`
    const productData = await client.fetch(productQuery)
    
    const paths = productData.map(product => {
        return {
            params: {slug: product.slug.current}
        }
    })

    return {
        paths: paths,
        // fallback: true // use true for fallback page and it doesnt work with dynamic pages
        fallback: false
    }
}

export const getStaticProps = async ({params: { slug }}) => {
    
    const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`
    const productData = await client.fetch(productQuery)

    const allProductsQuery = "*[_type == 'product']"
    const allProductsData = await client.fetch(allProductsQuery)

    // if(!productData && allProductsData){ //for fallback page
    //     return {
    //         redirect: {
    //             destination: "/",
    //             permanent: false
    //         }
    //     }
    // }
    return {
        props: {productData, allProductsData}
    }
}

// ========= PRODUCT DETAILS ==========
function ProductDetails({productData, allProductsData}) {

    const {name, details, price, image} = productData
    const [index, setIndex] = useState(0)
    const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext()
    
    const handleBuyNow = async() => {
        onAdd(productData, qty)
        setShowCart(true)
    }
    
    // if (!productData && !allProductsData) return <FallbackPage />
    //can put here fallback page if the api endpoin doesn't exist
  return (
    
      <div>
        <div className="product-detail-container">

            <div>
                <div className="image-container">
                    <img src={urlFor(image && image[index])} alt="" className='product-detail-image'/>
                </div>

                <div className="small-images-container">
                    {image?.map((item, i) => {
                        return (
                            <img 
                                src={urlFor(item)} 
                                className={i === index ? 'small-image selected-image' : 'small-image'} 
                                onMouseEnter={() => setIndex(i)} 
                                key={i}
                            />
                        )
                    })}
                </div>
            </div>


            <div className="product-detail-desc">
                <h1>{name}</h1>
                <div className="reviews">
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>(20)</p>
                </div>
                <h4>Details:</h4>
                <p>{details}</p>
                <p className='price'>${price}</p>
                <div className="quantity">
                    <h3>Quantity:</h3>
                    <p className="quantity-desc">
                        <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                        <span className="num">{qty}</span>
                        <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                    </p>
                </div>
                <div className="buttons">
                    <button className='add-to-cart' onClick={() => onAdd(productData, qty)} >Add to Cart</button>
                    <button className='buy-now' onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>

        <div className="maylike-products-wrapper">
            <h2>You May Also Like</h2>
            <div className="marquee">
                <div className="maylike-products-container track">
                    {allProductsData?.map(product => <Product key={product._id} product={product}/>)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails
import React, { useState } from 'react'
import { urlFor, client } from '../../lib/client'
import { AiOutlineMenu, AiOutlinePlus, AiFillStar, AiOutlineStar, AiOutlineMinus } from 'react-icons/ai'
import { Phone } from '../../components'
import { useStateContext } from '../../context/StateContext';

const PhoneDetails = ({ products, product}) => {

    const { image, name, details, price, kitProductName, kitImage, kitPrice } = product
    const [ index, setIndex ] = useState(0)
    const { decQty, incQty, qty, onAdd } = useStateContext();
  return (
    <div>
        <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img src={urlFor(image && image[index])} className="product-detail-image"/>
                    </div>
                    <div className='small-images-container'>
                        {image?.map((item, i) => (
                            <img src={urlFor(item)} 
                            className={i === index ? 'small-image selected-image' : 'small-image'}
                            onMouseEnter={() => setIndex(i)} 
                            />
                        ))}
                    </div>
                </div>
                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className='product-price'>${price}</p>
                    <div className='quantity'>
                  <h3>Quanity:</h3>
                  <p className='quantity-desc'>
                    <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                    <span className='num' onClick="">{qty}</span>
                    <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                  </p>
                </div>
                <div className="buttons">
                <div className="buttons">
                    <button type='button' className='add-to-cart' 
                    onClick={() => onAdd(product, qty)}>
                        Add To Cart
                    </button>
                    <button type='button' className='buy-now'>
                        Buy Now
                    </button>
                </div>
                </div>
            </div>
        </div>
        <div className="kit">
            <h2>Buy it with</h2>
                <div>
                  <h4>
                    {kitProductName}
                  </h4>
                    {kitImage?.map((item, i) => (
                            <img src={urlFor(item)} 
                            className={'kit-image'}
                            />
                    ))}
                    <p className='product-price'>${kitPrice}</p>
                </div>
                <div className="buttons">
                    <button type='button' className='add-to-cart'>
                        Add To Cart
                    </button>
                </div>
        </div>
        <div className="maylike-products-wrapper">
            <h2>You May Also Like</h2>
            <div className="marquee">
                <div className='maylike-products-container track'>
                    {products.map((item) => (
                        <Phone key={item._id} phone={item}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "phone"] {
        slug {
            current
        }
    }`
    const products = await client.fetch(query)

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "phone" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "phone"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  
    return {
      props: { products, product}
    }
  }

export default PhoneDetails
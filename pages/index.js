import React from 'react'
import { Product, FooterBanner, HeroBanner, Phone, Audio } from '../components'
import { client } from '../lib/client'

const Home = ({ products, bannerData, phones, audios }) => {
  return (
    <div style={{bacground: 'red'}}>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Discover New Tech</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => <Product key={product._id} product={product}/>)}
      </div>
      {/* <div className="phones"> */}
      <h2>ROG Phones</h2>
      <div className='products-container'>
        {phones?.map((phone) => <Phone key={phone?._id} phone={phone}/>)}
      </div>
      <h2>ROG Audio</h2>
      <div className='products-container'>
        {audios?.map((audio) => <Audio key={audio?._id} audio={audio}/>)}
      </div>
        
      {/* </div> */}

      <FooterBanner FooterBanner={bannerData && bannerData[0]}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const phoneQuery = '*[_type == "phone"]';
  const phones = await client.fetch(phoneQuery);

  const audioQuery = '*[_type == "audio"]';
  const audios = await client.fetch(audioQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData, phones, audios }
  }
}

export default Home

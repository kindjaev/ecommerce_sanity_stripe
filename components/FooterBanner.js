import React from 'react'
import Link from "next/link"
import { urlFor } from '../lib/client'

function FooterBanner({bannerData: data}) {
  return (
    <div className='footer-banner-container'>
      <div className="banner-desc">
        <div className="left">
          <p>{data.discount} OFF</p>
          <h3>{data.largeText1.toUpperCase()}</h3>
          <h3>{data.largeText2.toUpperCase()}</h3>
          <p>{data.saleTime}</p>
        </div>
        <div className="right">
          <p>{data.smallText}</p>
          <h3>{data.midText}</h3>
          <p>{data.desc}</p>
          <Link href={`/product/${data.product}`}>
            <button>{data.buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(data.image)} alt="headphones" className="footer-banner-image"/>
      </div> 
    </div>
  )
}

export default FooterBanner
import React from 'react'
import Link from "next/link"

import { urlFor } from '../lib/client'

function HeroBanner({bannerData: data}) {
// console.log(data)
  return (
    <div className='hero-banner-container'>
      <div>
        <p className="beats-solo">{data.smallText}</p>
        <h3>{data.midText}</h3>
        <h1>{data.largeText1}</h1>
        <img src={urlFor(data.image)} alt="headphones" className='hero-banner-image'/>
      </div> 
      <div>
        <Link href={`/product/${data.product}`}>
          <button type='button'>{data.buttonText}</button>
        </Link>
        <div className='desc'>
          <h5>Description</h5>
          <p>{data.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
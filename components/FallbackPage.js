import React from 'react'

function FallbackPage() {
  return (
    <div className='fallback-page'> 
        <div>THIS PAGE DOESN'T EXIST YET...</div>

        <style jsx>{`
        .fallback-page {
            font-size: 2rem;
            color: #324d67;
            margin: 250px auto;
            text-align: center;
        }
        `}</style>
    </div>
  )
}

export default FallbackPage
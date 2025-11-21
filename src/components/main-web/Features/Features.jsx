import React from 'react'
import TopCategory from './TopCategory'
import FeaturedListing from './FeaturedListing'

function Features() {
  return (
    <div className='feautures-main Dashboard-container'>

        <FeaturedListing />
        <TopCategory/>
    </div>
  )
}

export default Features

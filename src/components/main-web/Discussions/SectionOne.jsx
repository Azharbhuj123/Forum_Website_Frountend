import React from 'react'
import {Plus_Svg} from '../../Svg_components/Svgs'

export default function SectionOne() {
  return (
    <div className=''>
        <button className="back-button" onClick={() => window.history.back()}>
          <span className="back-arrow">‹</span> Back
        </button>

        <div className="discussion-head-main">
                <div className="heading">
                    <h1>Community Discussions</h1>
                    <p>Join the conversation and connect with the community</p>
                </div>
                    <button><Plus_Svg /> Start Discussion</button>
        </div>
    </div>
  )
}

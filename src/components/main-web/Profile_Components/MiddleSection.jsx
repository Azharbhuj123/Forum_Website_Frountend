import React from 'react'
import { Reply_Svg, Thumb_Svg } from '../../Svg_components/Svgs'

export default function MiddleSection() {
  return (
    <div class="smitchell-review-component">
    
    <div class="smitchell-review-tabs">
        <button class="smitchell-review-tab-button smitchell-review-tab-active">Reviews</button>
        <button class="smitchell-review-tab-button">Photos</button>
        <button class="smitchell-review-tab-button">Saved</button>
        <button class="smitchell-review-tab-button">Activity</button>
    </div>

    <div class="smitchell-review-list">

        <div class="smitchell-review-item">
            <h3 class="smitchell-review-place-name">La Cocina Mexicana</h3>
            <div class="smitchell-review-rating">
                <span class="smitchell-review-stars">★★★★★</span>
                <span class="smitchell-review-date">2024-11-01</span>
            </div>
            
            <h4 class="smitchell-review-title">Best Mexican Food in Town!</h4>
            
            <p class="smitchell-review-body">
                I've been coming to La Cocina Mexicana for months now, and every visit is better than the last. The carne asada tacos are absolutely incredible – perfectly seasoned and cooked to perfection. The ambiance is perfect for both family dinners and casual meetups. The staff is incredibly attentive and friendly. The salsa verde is to die for! Highly recommend trying their weekend brunch menu as well.
            </p>

            <div class="smitchell-review-actions">
                <span class="smitchell-review-stat">
                    <Thumb_Svg/> 234
                </span>
                <span class="smitchell-review-stat">
                    <Reply_Svg/> 18
                </span>
            </div>
        </div>

        <div class="smitchell-review-item">
            <h3 class="smitchell-review-place-name">Serenity Wellness Center</h3>
            <div class="smitchell-review-rating">
                <span class="smitchell-review-stars">★★★★☆</span>
                <span class="smitchell-review-date">2024-10-15</span>
            </div>
            
            <h4 class="smitchell-review-title">Life-Changing Wellness Journey</h4>
            
            <p class="smitchell-review-body">
                Serenity Wellness Center has truly transformed my approach to self-care. The yoga instructors are world-class, and the meditation sessions have helped me manage stress better than ever. The facility is pristine and the energy is so positive. I can't recommend this
            </p>

            <div class="smitchell-review-actions">
                <span class="smitchell-review-stat">
                    <Thumb_Svg/> 234
                </span>
                <span class="smitchell-review-stat">
                    <Reply_Svg/> 18
                </span>
            </div>
        </div>
    </div>
</div>
  )
}

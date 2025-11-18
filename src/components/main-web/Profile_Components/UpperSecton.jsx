import React from 'react'
import profile from '../../../assets/Images/profile.png'
import {Calendar_svg2, Followers_Svg, Star_OR_Svg, Thumb_Svg_OR} from '../../../components/Svg_components/Svgs'
import { useNavigate } from 'react-router-dom';
export default function UpperSecton() {
        const navigate = useNavigate();
    
  return (
    <>
     <button className="back-button" onClick={() => window.history.back()}>
          <span className="back-arrow">‹</span> Back
        </button>
    <div class="smitchell-profile-card">
    <div class="smitchell-profile-header">
        <div class="smitchell-profile-cover"></div>
        <div class="smitchell-profile-info-container">
            <div class="smitchell-profile-avatar-wrapper">
                <img src={profile} alt="Sarah Mitchell" class="smitchell-profile-avatar" />
                <span class="smitchell-profile-online-indicator"></span>
            </div>
            
            <div class="smitchell-profile-name-section">
                <h1 class="smitchell-profile-name">Sarah Mitchell</h1>
                <button class="smitchell-profile-edit-button"  onClick={()=>navigate('/edit-profile')}>Edit Profile</button>
            </div>

            <div class="smitchell-profile-badges">
                <span class="smitchell-profile-badge smitchell-profile-badge-top-reviewer">Top Reviewer</span>
                <span class="smitchell-profile-badge smitchell-profile-badge-top-reviewer">Local Guide</span>
            </div>
            
            <div class="smitchell-profile-meta">
                <span class="smitchell-profile-joined">
                    <Calendar_svg2 /> Joined 2024-01-15
                </span>
            </div>
            
            <div class="smitchell-profile-stats">
                <div class="smitchell-profile-stat-item">
                    <span class="smitchell-profile-stat-value"><Star_OR_Svg /> 147</span>
                    <span class="smitchell-profile-stat-label">Reviews</span>
                </div>
                <div class="smitchell-profile-stat-item">
                    <span class="smitchell-profile-stat-value"><Followers_Svg /> 2,340</span>
                    <span class="smitchell-profile-stat-label">Followers</span>
                </div>
                <div class="smitchell-profile-stat-item">
                      
                    <span class="smitchell-profile-stat-value"><Thumb_Svg_OR /> 1,234</span>
                    <span class="smitchell-profile-stat-label">Helpful Votes</span>
                </div>
            </div>
        </div>
    </div>
    </div>

    </>
  )
}

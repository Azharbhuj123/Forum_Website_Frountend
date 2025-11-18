import React from 'react'
import { Green_Check } from '../../Svg_components/Svgs';

export default function Guidelines() {

      const communityGuidelines = [
    { id: 'g1', text: 'Be respectful and courteous', type: 'positive' },
    { id: 'g2', text: 'Stay on topic', type: 'positive' },
    { id: 'g3', text: 'Provide helpful information', type: 'positive' },
    { id: 'g4', text: 'No spam or self-promotion', type: 'negative' },
  ];
  return (
    <div className="c-guidelines-card">
        <h3 className="c-guidelines-title">Community Guidelines</h3>
        <ul className="c-guidelines-list">
          {communityGuidelines.map((guideline) => (
            <li key={guideline.id} className="c-guidelines-item">
              <span
                className={`c-guidelines-icon c-guidelines-icon-${guideline.type}`}
              >
                {/* {guideline.type === 'positive' ? '✅' : '❌'} */}
                <Green_Check />
              </span>
              <span className="c-guidelines-text">{guideline.text}</span>
            </li>
          ))}
        </ul>
      </div>
  )
}

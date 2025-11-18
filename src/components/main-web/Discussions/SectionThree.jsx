import React from 'react';
import Chart2_Svg from '../../Svg_components/Chart2_Svg';
import { Green_Check } from '../../Svg_components/Svgs';
import Sponser from '../Sponser';
import Guidelines from '../Business_Components/Guidelines';
 
 
 

 export default function SectionThree() {
  const trendingTopics = [
    { id: 't1', name: 'Best Tacos in Town', status: 'Hot' },
    { id: 't2', name: 'Affordable Gyms', status: 'Hot' },
    { id: 't3', name: 'Work from Home Tips', status: 'Hot' },
    { id: 't4', name: 'Weekend Getaways', status: 'Hot' },
  ];



  return (
    <div className="c-community-widgets-container">
      {/* Trending Topics Card */}
      <div className="c-trending-card">
        <div className="c-trending-header">
          <Chart2_Svg/>
          <h3 className="c-trending-title">Trending Topics</h3>
        </div>
        <ul className="c-trending-list">
          {trendingTopics.map((topic) => (
            <li key={topic.id} className="c-trending-item">
              <span className="c-trending-item-name">{topic.name}</span>
              <span className="c-trending-item-status c-trending-item-status-hot">
                {topic.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Community Guidelines Card */}
     <Guidelines/>

      <Sponser/>
    </div>
  );
};

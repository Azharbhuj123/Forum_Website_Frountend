import React from 'react';
import Chart2_Svg from '../../Svg_components/Chart2_Svg';
import { Green_Check } from '../../Svg_components/Svgs';
import Sponser from '../Sponser';
import Guidelines from '../Business_Components/Guidelines';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../../../queryFunctions/queryFunctions';
 
 
 

 export default function SectionThree() {

   const { data, isLoading ,refetch } = useQuery({
    queryKey: ["trending-tops"],
    queryFn: () =>
      fetchData(`/discussion/trending-topics`),
    keepPreviousData: true,
  });

const trendingTopics =
  data?.data?.map((topic, index) => ({
    id: `${topic.tag}-${index ?? index}`,
    name: topic.tag,
    status: "Hot",
  })) || [];

 
 



  return (
    <div className="c-community-widgets-container">
      {/* Trending Topics Card */}

      <Sponser/>

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

    </div>
  );
};

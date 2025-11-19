import React from 'react'
import AdminDashboardheader from '../components/AdminDashboard_components/AdminDashboardheader'
import SectionOne from '../components/main-web/Business_Components/SectionOne'
import SectionTwo from '../components/main-web/Business_Components/SectionTwo'
import Footer from '../components/main-web/Footer'
 
export default function BusinessDetail() {
  return (
    <div>
        <AdminDashboardheader /> 
        <div className="feautures-main Dashboard-container business-detail-main ">
          <SectionOne/>
          <div className="res786">

          <SectionTwo/>
          </div>

        </div>

        <Footer/>

    </div>
  )
}

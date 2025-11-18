import React from 'react'
import AdminDashboardheader from '../components/AdminDashboard_components/AdminDashboardheader'
import Footer from '../components/main-web/Footer'
import UpperSecton from '../components/main-web/Profile_Components/UpperSecton'
import MiddleSection from '../components/main-web/Profile_Components/MiddleSection'

export default function Profile() {
  return (
   <div>
        <AdminDashboardheader /> 
        <div className="feautures-main Dashboard-container">
          <UpperSecton />
          <MiddleSection />
          {/* <SectionTwo/> */}
        </div>

        <Footer/>

    </div>
  )
}

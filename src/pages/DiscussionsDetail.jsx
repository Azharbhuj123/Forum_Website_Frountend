import React from 'react'
import AdminDashboardheader from '../components/AdminDashboard_components/AdminDashboardheader'
import SectionOne from '../components/main-web/DiscussionsDetail/SectionOne'
import SectionThree from '../components/main-web/Discussions/SectionThree'
import SectionTwo from '../components/main-web/DiscussionsDetail/SectionTwo'
import Footer from '../components/main-web/Footer'
 
export default function DiscussionsDetail() {
  return (
    <div>
        <AdminDashboardheader/>
        <div className="feautures-main Dashboard-container">
                <div className="section-divider">
                          <div className="divider-one">
                            <SectionOne />
                          </div>
                          <div className="divider-two">
                            <SectionTwo />
                        </div>
                        </div>
                 
              </div>

              <Footer/>
    </div>
  ) 
}

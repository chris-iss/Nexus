// eslint-disable-next-line no-unused-vars
import React from "react";
import DashboardLeftCol from "../../components/DashboardLeftCol";
import DashboardHeader from "../../components/DashboardHeader";
import "../profile/Profile.css"
import { Link } from "react-router-dom";
import "../dashboard/dashboard.css"
import MobileDashboardLeftCol from "../../components/MobileDashboardLeftCol";


const Profile = () => {
    return (
        <div className="profile-wrapper">
            <DashboardLeftCol />
            <MobileDashboardLeftCol />
            
            <div className="profile-rightcol">
                <DashboardHeader />
                <div className="rightcol-header-2">
                    <Link to="/profile" className="rightcol-header-link">User Profile </Link><span className="rightcol-header-2-span">/ Dashboard</span>
                </div>

                <div className="form-container">
                    <div className="form-col-1">
                        <div className="profile-card">
                            <p>Edit Profile <br></br><span>Complete your Profile</span></p>
                            
                        </div>
                        <div className="input-wrapper-1">
                            <input type="text" className="form-input-1" placeholder="Enter your Firstname" />
                        </div>
                        <div className="input-wrapper-2">
                            <input type="text" className="form-input-2" placeholder="Enter your Lastname" />
                        </div>
                        <div className="input-wrapper-3">
                            <input type="text" className="form-input-3" placeholder="Enter your Email" />
                        </div>

                        <div className="btn-wrapper">
                            <div className="btn">
                                <p>Update Profile</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-col-2">
                        <div className="img-wrapper">
                            <img src="https://cdn.instituteofsustainabilitystudies.com/wp-content/uploads/2024/11/17090739/my-image.jpeg" alt="profile-img" className="img-holder" />
                        </div>
                        <p className="para-1">Frontend Developer/Technical Integration Engineer</p>
                        <p className="para-2">Christian Iheacho</p>
                        <p className="para-3">
                            Frontend Developer and Technical Integration Manager at the Institute of Sustainability Studies Limited. I design and implement seamless API integrations, optimize data workflows, and collaborate with cross-functional teams to deliver effective technical solutions. 
                        </p>
                        <div className="follow-wrapper">
                            <div className="follow-btn">
                                <p>Follow</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
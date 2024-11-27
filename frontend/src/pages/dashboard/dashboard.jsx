// eslint-disable-next-line no-unused-vars
import React from "react";
import DashboardLeftCol from "../../components/DashboardLeftCol";
import DashboardRightCol from "../../components/DashboardRightCol";
import MobileDashboardLeftCol from "../../components/MobileDashboardLeftCol";

const Dashboard = () => {
    
    return (
        <div className="dashboard-wrapper">
            <DashboardLeftCol />
            <MobileDashboardLeftCol />
            <DashboardRightCol />
        </div>
    )
}

export default Dashboard;





// eslint-disable-next-line no-unused-vars
import React from "react";
import DashboardLeftCol from "../../components/DashboardLeftCol";
import DashboardRightCol from "../../components/DashboardRightCol";

const Dashboard = () => {
    
    return (
        <div className="dashboard-wrapper">
            <DashboardLeftCol />
            <DashboardRightCol />
        </div>
    )
}

export default Dashboard;

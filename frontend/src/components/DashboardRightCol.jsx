/* eslint-disable no-unused-vars */
import "../pages/dashboard/dashboard.css";
import { Link } from "react-router-dom";
import DashboardRightColCard from "./DashboardRightColCard";
import DashboardHeader from "./DashboardHeader";
import DashboardGraph from "./DashboardGraph";


const DashboardRightCol = () => {

    return (
       <div className="rightcol-wrapper">
            <DashboardHeader />
            <div className="rightcol-header-2">
                <Link to="/dashboard" className="rightcol-header-link">Home </Link><span className="rightcol-header-2-span">/ Dashboard</span>
            </div>

            <DashboardRightColCard />
            <DashboardGraph />
       </div>
    )
}

export default DashboardRightCol
import "../pages/dashboard/dashboard.css";
import { RxDashboard } from "react-icons/rx";
import { IoIosAlbums } from "react-icons/io";
import { SiCoursera } from "react-icons/si";
import { SlCalender } from "react-icons/sl";
import { TbBrandZoom } from "react-icons/tb";
import { MdPayments } from "react-icons/md";
import { Link } from "react-router-dom";
import { SiXero } from "react-icons/si";


const DashboardLeftCol = () => {

    return (
       <div className="leftcol-container">
        <div className="leftcol-icon">
            <img src="https://cdn.instituteofsustainabilitystudies.com/wp-content/uploads/2023/09/11114059/ISS_Logo_svg.svg" className="icon" alt="iss-logo" />
        </div>
        <Link to="/dashboard" className="dashboard">
            <RxDashboard size={20} />
            <p>Dashboard</p>
        </Link>

        <Link to="/orders" className="order-wrapper-row-1">
            <IoIosAlbums size={20} className="point-icon" />
            <p>WooCommerce Orders</p>
        </Link>

        <Link to="/payments" className="order-wrapper-row-1">
            <MdPayments size={23} className="point-icon" />
            <p>Online Payments</p>
        </Link>
        
        <div className="order-wrapper-row-1">
            <SiXero size={23} className="point-icon" />
            <p>Xero Invoice</p>
        </div>

        <div className="order-wrapper-row-1">
            <SiCoursera size={20} className="point-icon" />
            <p>Completed Lessons</p>
        </div>

        <div className="order-wrapper-row-1">
            <SlCalender size={20}  className="point-icon" />
            <p>Last Active Date</p>
        </div>

        <div className="order-wrapper-row-1">
            <TbBrandZoom size={24} className="point-icon" />
            <p>Webinar Attendees</p>
        </div>
       </div>
    )
}

export default DashboardLeftCol;
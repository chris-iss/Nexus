import "../pages/dashboard/dashboard.css";
import { RxDashboard } from "react-icons/rx";
import { IoIosAlbums } from "react-icons/io";
import { SiCoursera } from "react-icons/si";
import { SlCalender } from "react-icons/sl";
import { TbBrandZoom } from "react-icons/tb";
import { MdPayments } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { NexusContext } from "../context-api/ContextAPI";


const MobileDashboardLeftCol = () => {
    const {isModalOpen, handleToggle} = useContext(NexusContext);

    return (
        <div className={isModalOpen ? "mobile-leftcol-container-open" : "mobile-leftcol-container-close"}>
            <div className="leftcol-icon">
                <img src="https://cdn.instituteofsustainabilitystudies.com/wp-content/uploads/2023/09/11114059/ISS_Logo_svg.svg" className="icon" alt="iss-logo" />
                <IoClose className="close" size={30} onClick={handleToggle} />
            </div>
            <div className="dashboard">
                <RxDashboard size={20} />
                <p>Dashboard</p>
            </div>

            <div className="order-wrapper-row-1">
                <IoIosAlbums size={20} className="point-icon" />
                <p>New Orders</p>
            </div>

            <div className="order-wrapper-row-1">
                <MdPayments size={23} className="point-icon" />
                <p>Received Payments</p>
            </div>

            <div className="order-wrapper-row-1">
                <SiCoursera size={20} className="point-icon" />
                <p>Completed Lessons</p>
            </div>

            <div className="order-wrapper-row-1">
                <SlCalender size={20} className="point-icon" />
                <p>Last Active Date</p>
            </div>

            <div className="order-wrapper-row-1">
                <TbBrandZoom size={24} className="point-icon" />
                <p>Webinar Attendees</p>
            </div>
        </div>
    )
}

export default MobileDashboardLeftCol
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiLight } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import "../pages/dashboard/dashboard.css"
import { useContext } from "react";
import { NexusContext } from "../context-api/ContextAPI";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
    const { handleToggle } = useContext(NexusContext);

    return (
        <div className="rightcol-header">
            <div className="inner-leftcol-header">
                <RxHamburgerMenu size={22} color="#7c7c7c" className="humburger" onClick={handleToggle} />
                <Link to="/dashboard" className="hamburger-text"><p>Dashboard</p></Link>
            </div>
            <div className="inner-rightcol-header">
                <div className="notify-icon">4</div>
                <IoMdNotificationsOutline size={24} color="#7c7c7c" />
                <CiLight size={26} color="#7c7c7c" />
                <Link to="/profile"><CgProfile size={28} color="#7c7c7c" className="profile" /></Link>
            </div>
        </div>
    )
}

export default DashboardHeader;

import "../pages/dashboard/dashboard.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TfiEmail } from "react-icons/tfi";
import { CiLight } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const DashboardRightCol = () => {

    return (
       <div className="rightcol-wrapper">
            <div className="rightcol-header">
                <div className="inner-leftcol-header">
                    <RxHamburgerMenu size={22} color="#7c7c7c" className="humburger" />
                    <p>Dashboard</p>
                </div>
                <div className="inner-rightcol-header">
                    <div className="notify-icon">4</div>
                    <div className="message-icon">4</div>
                    <IoMdNotificationsOutline size={24} color="#7c7c7c" />
                    <TfiEmail size={22} color="#7c7c7c" />
                    <CiLight size={26} color="#7c7c7c" />
                    <CgProfile size={28} color="#7c7c7c" />
                </div>
            </div>

            <div className="rightcol-header-2">
                <p>Home <span className="rightcol-header-2-span">/ Dashboard</span></p>
            </div>
       </div>
    )
}

export default DashboardRightCol
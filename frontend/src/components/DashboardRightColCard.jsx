import { IoIosArrowRoundForward } from "react-icons/io";

const DashboardRightColCard = () => {
    return (
        <div className="dashboardRightColCard-wrapper">
            <div className="dashboard-card-1">
                <p className="dashboard-card-1-p">150</p>
                <p>New Orders</p>
                <div className="dashboard-card-1-bottom">View Orders <IoIosArrowRoundForward size={25} /></div>
            </div>
            <div className="dashboard-card-2">
                <p className="dashboard-card-2-p">10</p>
                <p>Received Payments</p>
                <div className="dashboard-card-2-bottom">Received Payments <IoIosArrowRoundForward size={25} /></div>
            </div>
            <div className="dashboard-card-3">
                <p className="dashboard-card-3-p">30</p>
                <p>Completed Lessons</p>
                <div className="dashboard-card-3-bottom">Completed Lessons <IoIosArrowRoundForward size={25} /></div>
            </div>
            <div className="dashboard-card-4">
                <p className="dashboard-card-4-p">90</p>
                <p>Last Active Date</p>
                <div className="dashboard-card-4-bottom">Last Active Date <IoIosArrowRoundForward size={25} /></div>
            </div>
        </div>
    )
}

export default DashboardRightColCard;
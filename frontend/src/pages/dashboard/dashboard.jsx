import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Dashboard = () => {
    const location = useLocation();

    
    return (
        <div className="dashboard-wrapper">
            <h1>Hello {location.state.id} and welcome on board</h1>
        </div>
    )
}

export default Dashboard

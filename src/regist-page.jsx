import { Outlet } from "react-router-dom"

function ResigtPage() {
    return (
        
        <div className="regist-container">
            <div className="regist-header">
                <span>B-mart</span>
            </div>
            <div className="regist-content">
                <Outlet/>
            </div>
        </div>
        
    )
}

export default ResigtPage
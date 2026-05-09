import { Outlet } from "react-router-dom"
import RegistLogo from "../src/assets/b-mart logo.png"

function ResigtPage() {
    return (
        
        <div className="regist-container">
            <div className="regist-header">
                <div className="regist-logo">
                    <img src={RegistLogo} alt="" />
                </div>
            </div>
            <div className="regist-content">
                <Outlet/>
            </div>
        </div>
        
    )
}

export default ResigtPage
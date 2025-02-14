import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Profile({Email}){
    const [token, setToken] = useState(localStorage.getItem("token"));
    
    const navigator = useNavigate()
    function onLogout() {
        localStorage.clear()
        setToken(null)
        navigator('/login')
    }
    return(
        <>
            <div className="font-mono text-3xl border rounded-full w-12 h-12 flex items-center justify-center mr-6">
                {Email.charAt(0)}
            </div>
            <a onClick={onLogout} className="cursor-pointer">Logout</a>
        </>
    )
}
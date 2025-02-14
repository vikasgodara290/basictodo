import { useEffect, useRef } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const navigater = useNavigate()

    async function onLogin(){
        const res = await axios.post('http://localhost:3000/login',{
            email:emailRef.current.value,
            password:passRef.current.value
        })
    
        if(res.data==='Please signup!'){
            alert(res.data)
            return
        }
        else{
            navigater('/todo')
            localStorage.setItem("token",res.data.token)
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigater('/todo')
        }
    },[])

    return(
        <div className="w-full h-full flex items-center justify-center  font-mono">
            <div className="w-1/4 h-1/3 border  flex flex-col gap-6 p-4 rounded-sm">
                <input className="font-mono block w-full h-12 border rounded-sm pl-2" type="Email" placeholder="Email" ref={emailRef}/>

                <input placeholder="Password" type="password" 
                className="font-mono block w-full h-12 border rounded-sm pl-2" ref={passRef}/>

                <button className="font-mono block bg-blue-300 border w-full h-12 rounded-sm" onClick={onLogin}>Login</button>
                <p className="text-sm font-mono">Want to create new <span className="underline cursor-pointer" onClick={()=>navigater('/signup')}>click here</span></p>
            </div>
        </div>
    )
}
import Profile from "./Profile";

export default function Nav({Email}){
    return(
    <div className="flex justify-between h-full font-mono">
        <div className="w-1/2 flex items-center">
            <span className="font-mono text-2xl">Hi {Email.split('@')[0]}!</span>
        </div>
        <div className="w-1/2 flex justify-end items-center">
            <Profile Email={Email}/>
        </div>
    </div>

    )
}
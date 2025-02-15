import { Pencil, Trash, Check, X} from "lucide-react";

export default function Button({onClick, name, todo}){
    return(

      <button onClick={onClick} className="mr-2 cursor-pointer">
      {(name==='Edit')?<Pencil size={18} onClick={onClick}/>:null}
        {(name==='Delete')?<Trash size={18} onClick={onClick}/>:null}
        {(name==='Done')?<Check size={18} onClick={onClick}/>:null}
        {(name==='Cancel')?<X size={18} onClick={onClick}/>:null}
      </button>

    )
  }

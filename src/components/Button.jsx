export default function Button({onClick, name}){
    return(
      <button onClick={onClick}>{name}</button>
    )
  }
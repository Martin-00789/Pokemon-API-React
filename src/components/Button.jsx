import "../sass/Button.scss"



const Button = ({icon,hanleclick}) => { 
  return (
    <div className="button__box">
      <button className="button" onClick={hanleclick}>{icon}</button>
      <div className="button__shadow"></div>
    </div>
  )
}

export {Button}

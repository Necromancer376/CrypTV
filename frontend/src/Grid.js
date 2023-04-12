import React from 'react'

export default function Grid (props) {

    console.log(props.arrOfObj);

  const cells = props.arrOfObj.map(obj => 
    <div style={{ backgroundColor: "#555555", width:250 ,height:250}} 
    className="item">
      <div>{
        <img src={obj.image} alt={obj.image} width={250} height={250} /> 
      }</div>
      <button type="button"
                  className="btn btn-primary float-right"
                  onClick={() => buy(obj.id)} >
                  Buy
      </button>
    </div>)

  return (

    <div className="container">
      {cells}
    </div>
  )
}
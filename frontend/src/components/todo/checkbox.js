import React from "react"

function CheckBox(props){
    return (
        <div>
            <input style={{float: "left"}} type={"checkbox"} checked={props.isChecked()} onChange={props.toggleChecked}/>
            <p>Filter Completed</p>
        </div>
    )
}

export default CheckBox
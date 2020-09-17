import React from "react"

type Props = {
    isChecked: boolean,
    toggleChecked: () => void
}

function CheckBox({isChecked, toggleChecked}: Props){
    return (
        <div>
            <input style={{float: "left"}} type={"checkbox"} checked={isChecked} onChange={toggleChecked}/>
            <p>Filter Completed</p>
        </div>
    )
}

export default CheckBox
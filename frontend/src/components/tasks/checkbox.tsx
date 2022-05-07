import React from "react"

type Props = {
    isChecked: boolean,
    toggleChecked: () => void,
    text: string
}

function CheckBox({isChecked, toggleChecked, text}: Props){
    return (
        <div>
            <p>{text}</p>
            <input type={"checkbox"} checked={isChecked} onChange={toggleChecked}/>
        </div>
    )
}

export default CheckBox
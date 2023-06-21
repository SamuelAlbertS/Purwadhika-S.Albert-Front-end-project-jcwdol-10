import React from "react";

const Chip = (props) => {
    const label = props.label
    return(
        <p className="w-fit capitalize rounded px-1 py-2 bg-gradient-to-r from-teal-500 to-sky-500 text-amber-700">{label}</p>
    )
}

export default Chip
// import { useEffect, useState } from "react";
import Box from "./Box"

function BoxContainer(props) {

    return (
        <div className="player-board">
        <h1>{props.type}</h1>
            <div className="box-container">
            {props.boxes.map((column, i) =>
                column.map((box, j) =>
                    <Box onClickBox={() => {props.handleClick(props.type, i, j)}} key={`${i}${j}`} type={props.type} boxValue={box} />
                ))}
        </div>
        </div>
    )
}

export default BoxContainer
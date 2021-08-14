import { useEffect, useState } from "react";

function Box(props) {
    const [color, setColor] = useState("");

    function changeColor(){
        if(props.boxValue === 1){
            if(props.type !== "enemy"){
                setColor("black");
            }
        }else if(props.boxValue === 2){
            setColor("red");
        }else if(props.boxValue === 3){
            setColor("dark-gray");
        }else{
            setColor("");
        }    
    }

    useEffect(() => {
        changeColor();
    })

    return(
        <div onClick={() => {props.onClickBox()}} className={"box " + color}>
        </div>
    )
}

export default Box;
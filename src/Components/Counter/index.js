import { useEffect, useState } from "react";
import './index.css';

const Counter = () => {
    const [counter, setCounter] = useState(3);
    
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (counter > 0) {
                setCounter(counter - 1);
            }
            if (counter === 0) {
                clearInterval(myInterval)
            } 
        }, 1000)
        console.log(myInterval);
        return ()=> {
            clearInterval(myInterval);
        };
    }, [counter]);

    return (
        <div className="counter-container">
            {counter}
        </div>
    )
}

export default Counter;
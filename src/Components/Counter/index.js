import { useEffect, useState } from "react";
import './index.css';

const Counter = (props) => {
    const [counter, setCounter] = useState(3);
    const { onCountDownEnd } = props;
    
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (counter > 1) {
                setCounter(counter - 1);
            }
            if (counter === 1) {
                clearInterval(myInterval)
                onCountDownEnd();
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    }, [counter, onCountDownEnd]);

    return (
        <div className="counter-container">
            {counter}
        </div>
    )
}

export default Counter;
import React, { useEffect, useRef, useState } from 'react';
import './index.css';

const Game = React.forwardRef((props, submitButtonRef) => {

    const [inputValue, setInputValue] = useState();
    const inputTextRef = useRef();

    useEffect(() => {    
        submitButtonRef.current.disabled = true;
        submitButtonRef.current.classList.add('button-disabled');
        inputTextRef.current.focus()
    }, [submitButtonRef])

    const onInputChange = (e) => {
        setInputValue(e.target.value);
        if(e.target.value === props.targetText) {
            submitButtonRef.current.disabled = false;
            submitButtonRef.current.classList.remove('button-disabled');
        } else {
            submitButtonRef.current.disabled = true;
            submitButtonRef.current.classList.add('button-disabled');
        }
    }

    return (
        <div className="game-container">
            <div className="target-text">
                {props.targetText}
            </div>
            <div className="input-area">
                <textarea ref={inputTextRef} onInput={onInputChange} value={inputValue}/>
            </div>
            <div className="button-area">
                <button ref={submitButtonRef} onClick={props.onSubmitted}>Submit <span className="runner">🏃</span></button>
            </div>
        </div>
    )
});

export default Game;
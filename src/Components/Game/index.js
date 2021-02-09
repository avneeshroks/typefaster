import React, { useEffect, useRef, useState } from 'react';
import './index.css';

const Game = React.forwardRef((props, submitButtonRef) => {

    const [inputValue, setInputValue] = useState();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const inputTextRef = useRef();
    const { onGameStarted } = props;

    useEffect(() => {
        onGameStarted();
    }, [onGameStarted])

    useEffect(() => {    
        submitButtonRef.current.disabled = true;
        submitButtonRef.current.classList.add('button-disabled');
        inputTextRef.current.focus()
    }, [submitButtonRef])

    const onInputChange = (e) => {
        setInputValue(e.target.value);
        if(e.target.value === props.targetText) {
            setButtonDisabled(false)
            submitButtonRef.current.classList.remove('button-disabled');
        } else {
            setButtonDisabled(true)
            submitButtonRef.current.classList.add('button-disabled');
        }
    }

    return (
        <div className="game-container">
            <div className="target-text">
                {props.targetText}
            </div>
            <div className="input-area">
                <textarea
                    onPaste={(e)=>{return false}}
                    ref={inputTextRef}
                    onInput={onInputChange}
                    value={inputValue}
                    placeholder="Start typing..."
                />
            </div>
            <div className="button-area">
                <button
                    ref={submitButtonRef}
                    disabled={buttonDisabled}
                    onClick={props.onSubmitted}
                >
                    <span>Submit </span>
                    <span className="runner">🏃</span>
                </button>
            </div>
        </div>
    )
});

export default Game;
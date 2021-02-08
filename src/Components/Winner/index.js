import { useEffect, useRef } from "react";
import { getFormmattedTime } from "../../util/formatter";
import './index.css';

const Winner = (props) => {
    const replayBtnRef = useRef();

    useEffect(() => {
        replayBtnRef.current.focus();
    }, [])

    const handleReplayBtnClick = () => {
        window.location.reload();
    }

    return (
        <div className="result-container">
            <div className="winner-text">
                <div>
                    {`The winner is : ${props.winnerName} 🥳`}
                </div>
                <div>
                    {`Time : ${getFormmattedTime(props.winnerTime)}`}
                </div>
                <div className="button-area">
                    <button
                        ref={replayBtnRef}
                        onClick={handleReplayBtnClick}
                    >
                        <span>Replay 🔁</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Winner;
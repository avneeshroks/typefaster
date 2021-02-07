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
                    {`The winner is : ${sessionStorage.getItem('username')} 🥳`}
                </div>
                <div>
                    {`Time : ${getFormmattedTime(props.endTime - props.startTime)}`}
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
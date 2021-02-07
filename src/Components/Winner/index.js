import { getFormmattedTime } from "../../util/formatter";
import './index.css';

const Winner = (props) => {
    return (
        <div className="result-container">
            <div className="winner-text">
                <div>
                    {`The winner is : ${sessionStorage.getItem('username')} 🥳`}
                </div>
                <div>
                    {`Time : ${getFormmattedTime(props.endTime - props.startTime)}`}
                </div>
            </div>
        </div>
    )
}

export default Winner;
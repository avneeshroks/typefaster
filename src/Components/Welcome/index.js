import './index.css';
import {usernameGenerator} from '../../util/usernameGenerator';
import { useState, useEffect } from 'react';

const Welcome = (props) => {
    const [username, setUsername] = useState();

    useEffect(() => {
        let uname = usernameGenerator();
        sessionStorage.setItem('username', uname);
        setUsername(uname);
    }, [])

    return (
        <div className="result-container">
            <div className="greet">{`Welcome ${username} 🙏`}</div>
            <div className="button-area">
                <button onClick={props.handlePlayClick}>Play 🤓</button>
            </div>
        </div>
    )
}

export default Welcome;
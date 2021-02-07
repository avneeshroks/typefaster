import './index.css';
import {usernameGenerator} from '../../util/usernameGenerator';
import { useState, useEffect, useRef } from 'react';

const Welcome = (props) => {
    const [username, setUsername] = useState();
    const playButtonRef = useRef();

    useEffect(() => {
        let uname = usernameGenerator();
        sessionStorage.setItem('username', uname);
        setUsername(uname);
        playButtonRef.current.focus();
    }, [])

    return (
        <div className="result-container">
            <div className="greet">{`Welcome ${username} 🙏`}</div>
            <div className="button-area">
                <button
                    onClick={props.handlePlayClick}
                    ref={playButtonRef}
                >
                    <span>Play 🤓</span>
                </button>
            </div>
        </div>
    )
}

export default Welcome;
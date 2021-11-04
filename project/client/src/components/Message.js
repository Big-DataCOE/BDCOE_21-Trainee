import React, {useState, useEffect} from 'react';
import '../assets/Message.css';

export default function Message({content, userName, timestamp, pos}) {

    const [style, setStyle] = useState();

    useEffect(()=>{
        (pos==="right")?
            setStyle({ borderRadius: "10px 10px 0 10px", backgroundColor: "#7400ca" }):setStyle({ borderRadius: "10px 10px 10px 0", backgroundColor: "#0b7e03" })
    },[pos]);

    return (
        <div className="message-container" style={{justifyContent: pos}}>
            <div className="message" style={style}>
                <div className="sender">{userName}</div>
                <div className="content">{content}</div>
                <div className="meta">
                    <div className="timestamp">{timestamp}</div>
                    <div className="status">sent</div>
                </div>
            </div>
        </div>
    )
}

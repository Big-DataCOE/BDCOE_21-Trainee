import '../assets/Alert.css';

export default function Alert({userName, message}) {
    return (
        <div id="alert">
            <div className="text" className="alert-msg">{userName} {message} the chat</div>
        </div>
    )
}

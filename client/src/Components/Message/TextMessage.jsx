import { MessageBox } from "react-chat-elements";

const TextMessage = ({ msg, userInfo, loderData }) => {
    return (
        <MessageBox key={msg._id}
            position={msg?.sender?.email == userInfo.email ? "right" : 'left'}
            type={msg?.msg?.type}
            title={msg?.sender?.email == userInfo.email ? userInfo.displayName : loderData.data.name}
            text={msg?.msg?.message}
            date={new Date(msg.time)}
            avatar={msg?.sender?.email == userInfo.email ? userInfo.photoURL : loderData.data.photoUrl}
            status={'read'}
        />
    );
};

export default TextMessage;
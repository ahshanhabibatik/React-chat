import PhotoMessage from "./PhotoMessage";
import TextMessage from "./TextMessage";
import VideoMessage from "./VideoMessage";


const MessageTypeChecker = ({ msg, userInfo, loderData }) => {
    if (msg?.msg?.type == 'text') {
        return (
            <TextMessage msg={msg} userInfo={userInfo} loderData={loderData} ></TextMessage>
        );
    }
    else if (msg?.msg?.type == 'photo') {
        return (
            <PhotoMessage msg={msg} userInfo={userInfo} loderData={loderData} ></PhotoMessage>
        );
    }
    else if (msg?.msg?.type == 'video') {
        return (
            <VideoMessage msg={msg} userInfo={userInfo} loderData={loderData} ></VideoMessage>
        )
    }

};

export default MessageTypeChecker;
import toast from "react-hot-toast";
import UploadFileCload from "../UploadFileCload/UploadFileCload";

const FileTypeChecker = async (file, msg) => {
    let messageData = {};
    let messageType = {};
    
    //check file type -- image or video;
    if ((file?.type?.split('/').shift()) == 'image') {
        messageType = { type: 'photo' }
    }

    else if ((file?.type?.split('/').shift()) == 'video') {
        //check file size 0 to 20 mb
        const fileSize = Math.round(file.size / (1024 * 1024))
        if (fileSize > 20) {
            toast.error('Send file only 0 to 30 MB !')
            return messageData
        }
        
        else {
            messageType = { type: 'video' }
        }
    }

    await UploadFileCload(file)
        .then((response) => response.json())
        .then((data) => {
            messageData = { ...msg, msg: { ...messageType, message: { url: data.secure_url }, reply: false }, time: Date.now() }
        })
        .catch(() => {
            messageData = {};
            toast.error('file upload failed, try again');
        });

    return messageData;
};

export default FileTypeChecker;
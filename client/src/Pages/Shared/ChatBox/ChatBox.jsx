import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";
import "react-chat-elements/dist/main.css"
import { authContext } from "../../../ContextHandler/AuthContext/Autthonicate";
import { FaArrowLeft } from "react-icons/fa6";
import MessageTypeChecker from "../../../Components/Message/MessageTypeChecker";
import { IoIosImages } from "react-icons/io";
import { Button } from "antd";
import { BsSendFill } from "react-icons/bs";
import { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import FileTypeChecker from "../../../Hooks/FileTypeChecker/FileTypeChecker";
import SkeletonMessage from "../../../Components/SkeletonMessage/SkeletonMessage";


const ChatBox = () => {
    const chatContainerRef = useRef(null);
    const axiosPublic = UseAxiosPublic();
    const [loading, setLoading] = useState(true);
    const loderData = useLoaderData();
    const [messages, setMassages] = useState([]);
    const { socket, userInfo } = useContext(authContext);
    const [fileLoading, setFileLoading] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const navig = useNavigate();
    const inputRef = useRef();
    const sendingAudio = useRef('');
    


    useEffect(() => {
        socket.on('connect', () => {
            //console.log('connected')
        });
        if (loderData) {
            axiosPublic.get(`/messages?m=${userInfo.email}&f=${loderData.data.email}`)
                .then(({ data }) => {
                    setMassages(data)
                    setLoading(false)
                })
        }
    }, [])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages])

    socket.on('disconnect', () => {
        //console.log('disconnected')
    });

    //default message information
    const message = {
        sender: {
            name: userInfo.displayName,
            email: userInfo.email,
            photoUrl: userInfo.photoURL
        },
        receiver: {
            id: loderData.data._id,
            name: loderData.data.name,
            email: loderData.data.email,
            photoUrl: loderData.data.photoUrl
        },
    }

    //receive message
    socket.on(userInfo.email, (msg) => {
        //if your conversation is open
        if (msg?.sender?.email == loderData?.data?.email) {
            setMassages([...messages, msg])
            document.getElementById('receivingAudio').play();
        }
    })


    const handleSendMsg = async (e) => {
        e.preventDefault();
        let messageInfo = {};
        if (attachment) {
            setFileLoading(true)
            messageInfo = await FileTypeChecker(attachment, message)
            setFileLoading(false);
            setAttachment(null);
        }
        else {
            if (e.target.textField.value && e.target.textField.value != '') {
                messageInfo = await { ...message, msg: { type: 'text', message: e.target.textField.value, reply: false }, time: Date.now() }
            }
            else {
                return
            }
        }

        // upload message socket and data base
        if (Object.keys(messageInfo).length > 0) {
            await socket.emit('sendMessage', messageInfo, loderData.data.email);
            await setMassages([...messages, messageInfo]);
            sendingAudio.current.play();
            inputRef.current.value = '';
        }
    }


    const fileupload = (e) => {
        setAttachment(e.target.files[0]);
    }


    return (
        <div ref={chatContainerRef} className="h-screen chat-box w-full overflow-y-auto bg-[url('https://i.ibb.co/NyZkx2Q/e86c13b0-4e16-4c56-b5b5-1a90acbea77c-naruwhatsappwallpaperdark.webp')]">
            <div className="bg-[#121C22] text-[#a0bcd3] shadow-md p-2 flex gap-x-3 items-center sticky top-0 z-50">
                <FaArrowLeft onClick={() => navig('/chat')} className="text-2xl lg:hidden cursor-pointer mr-2"></FaArrowLeft>

                <div className="avatar z-0">
                    <div className="w-10 h-10 rounded-full z-0">
                        <img className="z-0" src={loderData.data.photoUrl} alt="profile image" />
                    </div>
                </div>
                <h2 className="font-medium">{loderData.data.name}</h2>
            </div>


            <div className="flex-grow mb-5 min-h-[calc(100vh-144px)]">
                {
                    loading ? <div>
                        <SkeletonMessage></SkeletonMessage>
                    </div> :
                        messages?.map((msg) => {
                            return <MessageTypeChecker userInfo={userInfo} key={msg._id} msg={msg} loderData={loderData}></MessageTypeChecker>
                        })
                }

                {/* message sending audio */}
                <audio ref={sendingAudio}>
                    <source src="https://res.cloudinary.com/devlj6p7h/video/upload/v1705640145/docs/g5elp0o0lubgyrz76jgn.mp3" type="audio/ogg" />
                </audio>
                {/* message receiveing audio */}
                <audio id="receivingAudio" >
                    <source src="https://res.cloudinary.com/devlj6p7h/video/upload/v1705641840/docs/q6r5ualu8qwdzpnou2dq.mp3" type="audio/ogg" />
                </audio>
            </div>

            <form onSubmit={handleSendMsg} className="sticky bottom-0 p-3 w-full bg-[#121C22] shadow-lg flex flex-row gap-2 items-center">
                <label htmlFor="attachment" className="relative">
                    <IoIosImages className="h-11 w-11 bg-[#0B1114] text-white hover:text-blue-500 duration-150 p-2 rounded-md cursor-pointer"></IoIosImages>
                    {
                        attachment && <button onClick={() => setAttachment(null)} className="absolute -top-2 -right-2 text-red-500 text-xl"><RxCross2></RxCross2></button>
                    }
                </label>
                <input onChange={fileupload} type="file" id="attachment" name="attachment" className="hidden" />


                <input type="text" name="textField" className="text-sm rounded-lg block w-full py-2.5 px-3 bg-[#0B1114] placeholder-gray-400 text-white border border-[#0B1114] focus:outline-0 focus:border-[#3B82F6]" placeholder="write message..." autoComplete="off" ref={inputRef}></input>

                <Button loading={fileLoading} htmlType="submit" size="large" style={{ background: '#0B1114', border: '#0B1114' }} icon={<BsSendFill className="text-sm" />}>
                    Send
                </Button>

            </form>
            <Toaster></Toaster>
        </div>
    );
};

export default ChatBox;
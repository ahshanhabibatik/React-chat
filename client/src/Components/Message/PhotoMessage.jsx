import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { MessageBox } from "react-chat-elements";
import { FaCloudArrowDown } from "react-icons/fa6";
// import DownloadFile from "../DownloadFile/DownloadFile";


const PhotoMessage = ({ msg, userInfo, loderData }) => {
    const [imageDimensions, setImageDimensions] = useState({ width: 100, height: 100 });

    const getImageDimensions = (url) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {

            const obj = img.width < 150 ?
                { width: img.width, height: img.height }
                : img.width < 450 ?
                    { width: (img.width * 70) / 100, height: (img.height * 70) / 100 }
                    : img.width < 600 ?
                        { width: (img.width * 40) / 100, height: (img.height * 40) / 100 }
                        : img.width < 800 ?
                            { width: (img.width * 30) / 100, height: (img.height * 30) / 100 }
                            : img.width < 2000 ?
                                { width: (img.width * 15) / 100, height: (img.height * 15) / 100 }
                                : { width: (img.width * 5) / 100, height: (img.height * 5) / 100 };

            setImageDimensions(obj);
        };
    };

    const imageUrl = msg?.msg?.message?.url;

    useEffect(() => {
        if (imageUrl) {
            getImageDimensions(imageUrl);
        }
    }, [imageUrl]);




    const [modalInfo, setModalInfo] = useState({
        isOpen: false,
        imgUrl: null,
        fileName: null,
    })

    const clickImg = async (e) => {
        const imgUrl = e.target.src;
        const urlArray = imgUrl.split('/');
        urlArray.splice(6, 0, 'fl_attachment');
        const result = await urlArray.join('/');

        setModalInfo({
            isOpen: true,
            imgUrl: e.target.src,
            downloadUrl: result,
        })
    }

    const cencelModal = () => {
        setModalInfo({ imgUrl: null, isOpen: false, fileName: null })
    }


    return (
        <>
            <MessageBox key={msg._id}
                position={msg?.sender?.email == userInfo.email ? "right" : 'left'}
                type={msg?.msg?.type}
                title={msg?.sender?.email == userInfo.email ? userInfo.displayName : loderData.data.name}
                data={{
                    uri: imageUrl,
                    height: imageDimensions.height, // Pass the height dynamically
                    width: imageDimensions.width,   // Pass the width dynamically
                    alt: 'image',
                }}
                onOpen={clickImg}
                date={new Date(msg.time)}
                avatar={msg?.sender?.email == userInfo.email ? userInfo.photoURL : loderData.data.photoUrl}
                status={'read'}
            />


            {
                modalInfo.isOpen && <Modal
                    title="Web Chats"
                    style={{backgroundColor : 'black'}}
                    open={modalInfo.isOpen}
                    onOk={cencelModal}
                    onCancel={cencelModal}
                    okButtonProps={{ style: { display: 'none' } }}
                    centered>

                    <img className="mx-auto my-3 " src={modalInfo?.imgUrl} alt="image" />
                    <span className="flex -mb-11">

                        <a href={modalInfo?.downloadUrl}>
                            <Button type="primary" icon={<FaCloudArrowDown className="text-sm" />}>
                                Download
                            </Button>
                        </a>

                    </span>
                </Modal>
            }


        </>

    );
};

export default PhotoMessage;
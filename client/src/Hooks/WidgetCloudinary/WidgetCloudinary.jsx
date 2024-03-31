import { useEffect, useRef } from "react";
import { MdOutlineEdit } from "react-icons/md";

const cloudName = import.meta.env.VITE_cloudName;
const unsignedUploadPreset = import.meta.env.VITE_unsignedUploadPreset;

const WidgetCloudinary = ({ updatePhoto, children }) => {
    const cloudinaryRef = useRef();
    const WidgetRef = useRef();
    console.log(children)

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        WidgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: cloudName,
            uploadPreset: unsignedUploadPreset,
            cropping: true,
            multiple: false,
            styles: {
                palette: {
                    window: "#000000",
                    sourceBg: "#000000",
                    windowBorder: "#8E9FBF",
                    tabIcon: "#FFFFFF",
                    inactiveTabIcon: "#8E9FBF",
                    menuIcons: "#2AD9FF",
                    link: "#08C0FF",
                    action: "#336BFF",
                    inProgress: "#00BFFF",
                    complete: "#33ff00",
                    error: "#EA2727",
                    textDark: "#000000",
                    textLight: "#FFFFFF"
                },
                fonts: {
                    default: null,
                    "'IBM Plex Sans', sans-serif": {
                        url: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans",
                        active: true
                    }
                }
            }

        }, (error, result) => {
            try {
                if (!error && result && result.event === "success") {
                    updatePhoto(result.info.secure_url)
                }
            } catch {
                //console.log(err)
            }

        })
    }, [])

    return <div onClick={() => WidgetRef.current.open()}>
        {children}
    </div>
};

export default WidgetCloudinary;
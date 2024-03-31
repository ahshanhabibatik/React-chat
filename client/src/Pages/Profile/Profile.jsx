import { useContext, useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { authContext } from "../../ContextHandler/AuthContext/Autthonicate";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic/UseAxiosPublic";
import { MdOutlineEdit } from "react-icons/md";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../../../firebase.init";
import WidgetCloudinary from "../../Hooks/WidgetCloudinary/WidgetCloudinary";

const Profile = () => {
    const { userInfo } = useContext(authContext);
    const axiosPublic = UseAxiosPublic();
    const [myInfo, setMyInfo] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false)
    const [edit, setEdit] = useState({
        nameInput: false,
        phoneInput: false,
        passInput: false
    })

    const updatePhoto = (url) => {
        setMyInfo({...myInfo, photoUrl : url})
        updateProfile(auth.currentUser, {
            photoURL: url,
        })
        
        axiosPublic.put('/updateUser', {email : userInfo.email, photoUrl : url})
            .then(() => {
                //
            })
            .catch(() => {
                toast.error('Something wents wrong, try again.');
            })
    }

    // get your profile data in database
    useEffect(() => {
        axiosPublic.get(`/myInfo/${userInfo.email}`)
            .then(({ data }) => {
                setMyInfo(data)
            })
    }, [])

    // reauthonicate user and check user credentials, when updating password
    const reauthonicate = (currentPassword) => {
        const user = auth.currentUser;
        const credentials = EmailAuthProvider.credential(
            user.email,
            currentPassword
        )
        return reauthenticateWithCredential(user, credentials);
    }

    //update firebase Displayname and update this user information in database
    const updateFirebase_Db = (name, newPassword, phone) => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })

        const updateData = { name: name, password: newPassword, phone: phone, email: userInfo.email }
        axiosPublic.put('/updateUser', updateData)
            .then(() => {
                toast.success('update successfully');
                setEdit({
                    nameInput: false,
                    phoneInput: false,
                    passInput: false
                })
                setIsUpdating(false)
            })
            .catch(() => {
                toast.error('Something wents wrong, try again.');
                setIsUpdating(false)
            })
    }


    const updateHandler = (e) => {
        e.preventDefault();
        setIsUpdating(true)
        const form = e.target;
        const name = form.name.value;
        const newPassword = form.password.value;
        const phone = form.phone.value;

        //check if password update is true
        if (myInfo.password != newPassword && newPassword) {
            reauthonicate(myInfo.password)
                .then(() => {
                    updatePassword(auth.currentUser, newPassword)
                        .then(() => {
                            setMyInfo({ ...myInfo, password: newPassword })
                            updateFirebase_Db(name, newPassword, phone)
                        })
                        .catch(() => {
                            setIsUpdating(false)
                            toast.error('Something wents wrong. Try again.')
                        });
                })
                .catch(() => {
                    setIsUpdating(false)
                    toast.error('Something wents wrong. Try again.')
                });
        }
        else {
            updateFirebase_Db(name, newPassword, phone)
        }
    }

    return (
        <div>

            <div className="flex items-center justify-center min-h-screen md:m-0 m-5">
                {
                    (!myInfo) ? <div>loading...</div> :
                        <div className="border-b-2 border-black block md:flex">
                            <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-[#121C22] shadow-md">

                                <Link to='/chat' className="flex items-center gap-x-1 mb-3">
                                    <IoHome className="text-sm text-gray-400"></IoHome>
                                    <p className="text-sm text-gray-00">Home</p>
                                </Link>

                                <div className="flex justify-between">
                                    <span className="text-xl font-semibold block text-gray-200">Your Profile</span>

                                </div>

                                <span className="text-gray-400">This information is secret so be careful</span>
                                <div className="w-full p-8 mx-2 flex justify-center">
                                    <img id="showImage" className="max-w-xs w-32 items-center border" src={myInfo?.photoUrl} alt="profile photo" />


                                    <WidgetCloudinary updatePhoto={updatePhoto}><MdOutlineEdit className="-ml-5 text-white group-hover:block text-xl bg-[#121C22] cursor-pointer"></MdOutlineEdit></WidgetCloudinary>

                                </div>
                            </div>

                            <div className="w-full md:w-3/5 p-8 bg-[#121C22] lg:ml-4 shadow-md">
                                <form onSubmit={updateHandler} className="rounded shadow p-6">
                                    <div className="pb-3">
                                        <label htmlFor="name" className="font-semibold text-gray-300 block pb-1">Name</label>
                                        <div className="flex group">
                                            <input disabled={!edit.nameInput} id="name" name="name" className="border-1  rounded-r px-4 py-2 w-full text-gray-400" type="text" defaultValue={myInfo?.name} />
                                            <MdOutlineEdit className="-ml-4 hidden group-hover:block text-lg text-gray-400" onClick={() => setEdit({ ...edit, nameInput: true })}></MdOutlineEdit>
                                        </div>
                                    </div>
                                    <div className="pb-3">
                                        <label htmlFor="phone" className="font-semibold text-gray-300 block pb-1">Phone</label>
                                        <div className="flex group">
                                            <input disabled={!edit.phoneInput} id="phone" name="phone" className="border-1  rounded-r px-4 py-2 w-full text-gray-400" type="number" defaultValue={myInfo?.phone} />
                                            <MdOutlineEdit className="-ml-4 hidden group-hover:block text-lg text-gray-400" onClick={() => setEdit({ ...edit, phoneInput: true })}></MdOutlineEdit>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="font-semibold text-gray-300 block pb-1">Password</label>
                                        <div className="flex group">
                                            <input disabled={!edit.passInput} id="password" name="password" className="border-1 text-gray-400 rounded-r px-4 py-2 w-full" type="text" defaultValue={myInfo?.password} />
                                            <MdOutlineEdit className="-ml-4 hidden group-hover:block text-lg text-gray-400" onClick={() => setEdit({ ...edit, passInput: true })}></MdOutlineEdit>
                                        </div>

                                        {
                                            (edit.nameInput || edit.phoneInput || edit.passInput) &&
                                            <button type="submit" className="btn btn-sm btn-info w-full bg-blue-500 text-white hover:bg-blue-600 mt-4">
                                                Update
                                                {
                                                    isUpdating && <span className="loading loading-spinner loading-xs"></span>
                                                }
                                            </button>
                                        }

                                        <span className="text-gray-400 pt-4 block opacity-70">Personal login information of your account</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                }

            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Profile;
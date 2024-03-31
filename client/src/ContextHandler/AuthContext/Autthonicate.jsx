import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../../firebase.init"
import { io } from 'socket.io-client';

export const authContext = createContext(null);

const Autthonicate = ({ children }) => {
    const URL = 'https://chat-server-ahshanhabibatik-ahshan-habib-s-projects.vercel.app';
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const provider = new GoogleAuthProvider();

    const creatUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUserInfo(currentUser);
            setSocket(io(URL));
            setLoading(false);
            // if (currentUser) {
            //     setSocket(io(URL))
            //     setUserInfo(currentUser)
            //     setLoading(false)
            // }
        })
        return () => {
            unsubscribe()
        }
    }, [])


    const authInfo = {
        setUserInfo,
        userInfo,
        loading,
        creatUser,
        loginUser,
        googleLogin,
        logOutUser,
        socket,
    }

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default Autthonicate;
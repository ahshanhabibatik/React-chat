import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { authContext } from '../../../ContextHandler/AuthContext/Autthonicate';


function Private({ children }) {
    const { userInfo, loading } = useContext(authContext);

    if (loading) {
        return <div className="min-h-[90vh] flex justify-center items-center">
            <Spin
                size='large'
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 40,
                            fontWeight: 'bold'
                        }}
                        spin
                    />
                }
            />

        </div>
    }

    else if (userInfo) {
        return children;
    }

    return <Navigate state={{ from: '/' }} to="/login" replace></Navigate>
}

export default Private
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MailOutlined } from '@ant-design/icons';
import { Input, Space, Spin } from 'antd';
import toast, { Toaster } from "react-hot-toast";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic/UseAxiosPublic";
import { authContext } from "../../ContextHandler/AuthContext/Autthonicate";
// import { Helmet } from 'react-helmet-async';

function Login() {
  const { loginUser, googleLogin } = useContext(authContext)
  const [passwordVisible, setPasswordVisible] = useState(false)
  //const { state } = useLocation();
  const [loader, setLoader] = useState(false);
  const navig = useNavigate();
  const axiosPublic = UseAxiosPublic();

  const handleLogin = (e) => {
    setLoader(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        setLoader(false)
        form.reset();
        navig('/chat')
        //state ? navig(`${state}`) : navig(`/`)
      })
      .catch(() => {
        setLoader(false)
        toast.error('Enter valid email or password')
      })
  }

  const handleGoogleSign = () => {
    setLoader(true)
    googleLogin()
      .then(({ user }) => {
        const { email, displayName, phoneNumber, photoURL } = user;
        axiosPublic.put("/addUser", { email, name: displayName, password: null, phone: phoneNumber, photoUrl: photoURL })
          .then(() => {
            setLoader(false)
            navig('/chat')
          })
          .catch(() => {
            setLoader(false)
          })
      })
      .catch(() => {
        setLoader(false)
        toast.error('Something wents wrong, try again.')
      })
  }

  return (
    <>
      <Spin tip="Loading..." spinning={loader} size="large">
       
        <section className="bg-gray-50">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">

            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  SignIn your account
                </h1>
                <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                    <Space direction="horizontal" className="w-full mx-auto">
                      <Input size="large" type="email" name="email" id="email" placeholder="name@gmail.com" required prefix={<MailOutlined />} />
                    </Space>
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <Space direction="horizontal" className="w-full mx-auto">
                      <Input.Password size="large" name="password" id="password" required
                        placeholder="password..."
                        visibilityToggle={{
                          visible: passwordVisible,
                          onVisibleChange: setPasswordVisible,
                        }}
                      />
                    </Space>

                    {/* <p className="mt-3 text-right text-gray-500"><Link to={"/forgetPass"}>Forget password!</Link></p> */}
                  </div>


                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-red-500 focus:ring-3 focus:ring-primary-300" defaultChecked={true} required />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                    </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Sign In</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Dont have an account? <Link to="/register" className="font-medium text-gray-800 hover:underline">Register now</Link>
                  </p>

                  <div className="group w-full flex justify-center items-center mt-5 h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 cursor-pointer" onClick={handleGoogleSign}>
                    <div className="relative flex justify-between items-center space-x-7">
                      <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="absolute left-0 w-4" alt="google logo" />
                      <span className="text-base font-bold text-gray-700 transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Toaster></Toaster>
        </section>
      </Spin>

    </>
  )
}

export default Login
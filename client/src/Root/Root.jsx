import chatPhoto from "../../public/chat-logo-design_93835-108-removebg-preview.png"
import { Link } from "react-router-dom";

const Root = () => {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <nav className="flex justify-between items-center ">
                <img className="h-20 w-20" src={chatPhoto} alt="logo" />
                <Link to="/login" className="bg-transparent hover:bg-[#34AAFC] text-[#34AAFC] font-medium hover:text-white py-2 px-3 lg:px-5 text-sm lg:text-base border border-[#34AAFC] hover:border-transparent rounded-full font-popins">Login Now</Link>
            </nav>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 lg:gap-x-5 gap-y-0 items-center min-h-[calc(100vh-80px)]">
                <div className="order-2 md:order-1 text-center md:text-left mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-bold uppercase text-blue-200 mb-2">
                        Send message fast<span className="text-orange-600"> &</span> queckly
                    </h2>
                    <h1 className="font-extrabold text-transparent text-6xl lg:text-7xl bg-clip-text bg-gradient-to-r from-sky-400 to-blue-700  text-center">Your Friends</h1>
                    <div className="flex justify-center">
                    <Link to="/chat" className="bg-blue-500 font-medium text-white py-3 px-4 lg:px-5 text-sm lg:text-base  hover:border-transparent rounded-lg font-popins my-3">Get Started</Link>
                    </div>


                </div>
                <div className="order-1 md:order-2 mx-auto">
                    <img className="h-64 w-auto md:h-auto md:w-auto" src="https://i.ibb.co/2PbZvrv/istockphoto-1066987454-612x612-removebg-preview.png" alt="bg image" />
                    
                </div>

            </div>
        </div>
    );
};

export default Root;
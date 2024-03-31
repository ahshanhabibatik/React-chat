import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonMessage = () => {
    return (
        <div className="p-2">
            <div className="my-2">
                <Skeleton borderRadius={10} containerClassName="flex-1" height={40} width={180} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
            </div>

            <div className="text-right my-2">
                <Skeleton borderRadius={10} containerClassName="flex-1" height={80} width={200} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
            </div>

            <div className="my-2">
                <Skeleton borderRadius={10} containerClassName="flex-1" height={40} width={150} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
            </div>

            <div className="my-2">
                <Skeleton borderRadius={10} containerClassName="flex-1" height={90} width={200} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
            </div>

            <div className="text-right my-2">
                <Skeleton borderRadius={10} containerClassName="flex-1" height={40} width={150} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
            </div>
        </div>
    );
};

export default SkeletonMessage;
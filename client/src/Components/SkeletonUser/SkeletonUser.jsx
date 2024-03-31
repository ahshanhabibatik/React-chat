import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonUser = () => {
    return (
        <div className='space-y-4'>
            <div className="flex items-center gap-x-3">
                <Skeleton circle={true} width={40} height={40} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
                <Skeleton containerClassName="flex-1" height={40} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
            </div>
            <div className="flex items-center gap-x-3">
                <Skeleton circle={true} width={40} height={40} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
                <Skeleton containerClassName="flex-1" height={40} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
            </div>
            <div className="flex items-center gap-x-3">
                <Skeleton circle={true} width={40} height={40} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
                <Skeleton containerClassName="flex-1" height={40} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
            </div>
            <div className="flex items-center gap-x-3">
                <Skeleton circle={true} width={40} height={40} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
                <Skeleton containerClassName="flex-1" height={40} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
            </div>
        </div>
    );
};

export default SkeletonUser;
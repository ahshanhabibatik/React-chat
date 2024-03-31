import toast from "react-hot-toast";

const DownloadFile = async (url, filename) => {
    const arr = url.split('/')
    arr.splice(6, 0, 'fl_attachment')
    const result = await arr.join('/');

    const anchorTag = document.createElement('a');
    anchorTag.href = result;  // Use the provided URL parameter
    anchorTag.setAttribute('download', filename);
    document.body.appendChild(anchorTag);
    anchorTag.click();
    document.body.removeChild(anchorTag);


    // try {
    //     const response = await fetch(url);
    //     const blob = await response.blob();

    //     const link = document.createElement('a');
    //     link.href = window.URL.createObjectURL(blob);
    //     link.download = filename;

    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);

    //     window.URL.revokeObjectURL(link.href);
    // } catch (error) {
    //     toast.error('Downloading failed, try again.');
    // }
};

export default DownloadFile;
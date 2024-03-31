
const UploadFileCload = (file) => {
    const cloudName = import.meta.env.VITE_cloudName;
    const unsignedUploadPreset = import.meta.env.VITE_unsignedUploadPreset;

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const fd = new FormData();
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('file', file);
    return fetch(url, {
        method: 'POST',
        body: fd,
    })
};

export default UploadFileCload;
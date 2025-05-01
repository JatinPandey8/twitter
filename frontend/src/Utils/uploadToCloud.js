
import { Cloudinary } from '@cloudinary/url-gen';

export const uploadToCloud = async (pics) => {
    if (pics) {
        const data = new FormData();
        data.append("file", pics)
        data.append("upload_preset", "twitter");
        data.append("cloud_name", "dium4khmy")
        const res = await fetch("https://api.cloudinary.com/v1_1/dium4khmy/image/upload", {
            method: "post",
            body: data
        })
const fileData=await res.json();
return fileData.url.toString();

        }
        else console.log("error from upload funcytion")
    }

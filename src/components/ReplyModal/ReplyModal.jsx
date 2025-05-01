import * as React from 'react';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useFormik } from 'formik';

import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweetReplies } from '../../Store/Tweet/Action';
import { createTweet, createTweetReply } from '../../Store/Tweet/Action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    outline: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: 4
};

export default function ReplyModal({ open, handleClose, item }) {
    const [uploadingImage, setUploadingImage] = React.useState(false);
    const [selectImage, setSelectedImage] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [replies, setReplies] = useState([]);
    const handleSubmit = async (replyData) => {
    await dispatch(createTweetReply(replyData.tweetId, replyData));
    const updatedReplies = await dispatch(fetchTweetReplies(replyData.tweetId));
    setReplies(updatedReplies);
    formik.resetForm();
    setSelectedImage("");
    console.log("values", replyData);
};

    const handleSelectImage = (event) => {
        setUploadingImage(true);
        const imgUrl = event.target.files[0]
        formik.setFieldValue("image", imgUrl);
        setSelectedImage(imgUrl);
        setUploadingImage(false);
    }
const currentUser = useSelector(state => state.auth?.user || {}); 
    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
            tweetId: item?.id  
        },
        onSubmit: handleSubmit
    })

    useEffect(() => {
        const loadReplies = async () => {
            if (open && item?.id) {
                const data = await dispatch(fetchTweetReplies(item.id));
                setReplies(data);
            }

        };
        loadReplies();
    }, [open, item?.id]);

    const getTimeAgo = (timestamp) => {
  const now = new Date();
  const posted = new Date(timestamp);
  const diffMs = now - posted;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="flex space-x-5">
<Avatar className='cursor-pointer' onClick={() => navigate(`/profile/${currentUser?.id}`)}
    src={currentUser?.image || "https://www.vectorstock.com/royalty-free-vectors/profile-logo-vectors"} />

<div className="w-full">
                            <div className="flex justify-between items-center">
                                <div className="flex cursor-pointer space-x-2 \">
                                    <span className='font-semibold'>{currentUser?.fullName}</span>
                                    <span className='text-gray-600'>@{currentUser?.fullName.split("").join("_").toLowerCase()}</span>
                                    <img className='ml-2 w-5 h-5' src="blue tick" />
                                </div>

                            </div>
                            
                        </div>
                    </div>
                    <section className={'py-10'}>
                        <div className='flex space-x-5'>
<Avatar alt={currentUser?.fullName} src={currentUser?.image} />
                            <div className="w-full">
                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <input type="text" name='content' placeholder='Share Your Thoughts Here...'
                                            className={'border-none outline-none text-x1 bg-transparent'} {...formik.getFieldProps("content")} />
                                        {formik.errors.content && formik.touched.content && (
                                            <span className='text-red-500'>{formik.errors.content}</span>
                                        )}
                                    </div>
                                    {/* <div><img src=''></img>
                            </div> */}

                                    <div className="flex justify-between items-center mt-5">
                                        <div className="flex space-x-5 items-center">
                                            <label className='flex items-center space-x-2 rounded-md cursor-pointer'>
                                                <ImageIcon className='text-[#1d9bf0]' />
                                                <input type="file" name='imageFile' className='hidden' onChange={handleSelectImage} />
                                            </label>
                                            <FmdGoodIcon className='text-[#1d9bf0]' />
                                            <TagFacesIcon className='text-[#1d9bf0]' />
                                        </div>
                                        <Button sx={{ width: "100%", borderRadius: "20px", paddingY: "8px", paddingX: "20px", bgcolor: "text-[#1d9bf0]" }}
                                            variant="contained" type="submit" >
                                            tweet
                                        </Button>
                                    </div>
                                    {/* Display all replies below the tweet form */}
                                    <div className="mt-6 border-t pt-4">
                                        <h3 className="font-semibold mb-2">Replies</h3>
                                        {replies.length === 0 ? (
                                            <p className="text-sm text-gray-500">No replies yet</p>
                                        ) : (
                                            replies.map(reply => (
                                                <div key={reply.id} className="mb-4 p-2 bg-gray-100 rounded-lg">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <Avatar alt="user" src={reply.user?.image || ""} sx={{ width: 24, height: 24 }} />
                                                        <span className="text-sm font-semibold">{reply.user?.fullName}</span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(reply.createdAt).toLocaleString()} <p>  {getTimeAgo(reply.createdAt)}</p>
                                                        </span>

                                                    </div>
                                                    <p className="text-sm">{reply.content}</p>
                                                </div>
    ))
  )}
</div>


                                </form>
                            </div>
                        </div>

                    </section>
                </Box>
            </Modal>
        </div>
    );
}

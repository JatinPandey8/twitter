import { FavoriteOutlined, Repeat } from '@mui/icons-material'
import RepeatIcon from '@mui/icons-material/Repeat';
import { Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyModal from '../ReplyModal/ReplyModal';
import { useDispatch, useSelector } from 'react-redux';
import { createReTweet, likeTweet } from '../../Store/Tweet/Action';

import React, { useState, useEffect } from 'react';

const TweetCard = ({ item }) => {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [OpenReplyModel, setOpenProfileModel] = React.useState(false);
    const handleOpenReplyModel = () => setOpenProfileModel(true);
    const handleCloseReplyModel = () => setOpenProfileModel(false);
    const dispatch = useDispatch();
    const [likesCount, setLikesCount] = useState(item?.likes?.length || 0);
    const [liked, setLiked] = useState(!!item?.liked);
    const handleLiketweet = () => {
        const newLiked = !liked;
        setLiked(newLiked);
        item.totalLikes = (item.totalLikes || 0) + (newLiked ? 1 : -1);
        dispatch(likeTweet(item?.id));
    };


    const handleCreateRetweet = () => {
        dispatch(createReTweet(item?.id))
        console.log("Tweet ID:", item?.id, typeof item?.id);

        console.log("handleCreateRetweet");
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteTweet = () => {
        console.log("deleter tweet");
        handleClose();
    };
const auth = useSelector((store) => store.auth);

    return (
        <React.Fragment>
            {/* <div className='flex items-center font-semibold text-gray-700 py-2'>
                <Repeat />
                <p>your retweet</p>
                
            </div> */}
            <div className="flex space-x-5">
                <Avatar onClick={() => navigate(`/profile/${item?.user.id}`)} className="cursor-pointer"
                    src={auth.user?.image || 'data:image/png;base64,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'} />
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex cursor-pointer space-x-2 \">

                            <span className='font-semibold'>{item?.user?.fullName}</span>
                            <span className='text-gray-600'>@{item?.user?.fullName.split("").join("_").toLowerCase()}</span>
                            <img className='ml-2 w-5 h-5' src="data:image/png;base64,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" />
                        </div>
                    <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <MoreHorizIcon />

                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                            <MenuItem onClick={handleDeleteTweet}>Delete Tweet</MenuItem>
                            <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
                        </Menu>
                    </div>
                    </div>

                    <div className="mt-2">
                        <div onClick={() => navigate(`/tweet/${item?.id}`)} className="cursor-pointer" >
                            <p className="mb-2 p-0">{item?.content} </p>

                            {/* <img className="w-[28rem] border border-gray-400 p-5 rounded-md" src={item?.image} alt=""></img> */}
                            {item?.image && (
                                <img
                                    className="w-[28rem] border border-gray-400 p-5 rounded-md"
                                    src={item.image}
                                    alt="tweet"
                                />
                            )}

                        </div>
                        <div className="py-5 flex flex-wrap justify-between items-center">
                            <div className="space-x-3 flex items-center text-gray-600">
                                <ChatBubbleOutlineIcon className="cursor-pointer" onClick={handleOpenReplyModel} />
                                <p>{item?.totalReplies}</p>
                            </div>
                            <div className={`${item?.retweet} ? "text-pink-600" : "text-gray-600" space-x-3 flex items-center `}>
                                <RepeatIcon className="cursor-pointer" onClick={handleCreateRetweet} />
                                <p>{item?.totalRetweets}</p>
                            </div>

                            {/* <div className={`${item?.liked?.length} ? "text-pink-600" : "text-gray-600" space-x-3 flex items-center `}>
                                {item?.liked?.length ? (< FavoriteOutlined className="cursor-pointer" onClick={handleLiketweet} /> ):
                                    (<FavoriteIcon className="cursor-pointer" onClick={handleLiketweet} />)}
                                <p>{item?.totalLikes  || 0}</p>
                            </div> */}
                            <div className={`space-x-3 flex items-center ${liked ? "text-pink-600" : "text-gray-600"}`}>
                                {liked ? (
                                    <FavoriteIcon className="cursor-pointer" onClick={handleLiketweet} />
                                ) : (
                                    <FavoriteBorderIcon className="cursor-pointer" onClick={handleLiketweet} />
                                )}
                                <p>{item?.totalLikes || 0}</p>
                                {/* <p>{likesCount}</p> */}

                            </div>

                            <div className="space-x-3 flex items-center text-gray-600">
                                <BarChartIcon className="cursor-pointer" onClick={handleOpenReplyModel} />
                                <p>24</p>
                            </div>
                            <div className="space-x-3 flex items-center text-gray-600">
                                <FileUploadIcon className="cursor-pointer" onClick={handleOpenReplyModel} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  maybe issue with div */}
            <section>
                <ReplyModal item={item} open={OpenReplyModel} handleClose={handleCloseReplyModel} />
            </section>
        </React.Fragment >

    )
}

export default TweetCard

// import React, { useState } from 'react';
// import { Avatar } from '@mui/material';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import RepeatIcon from '@mui/icons-material/Repeat';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { createReTweet, likeTweet } from '../../Store/Tweet/Action';
// import ReplyModal from '../ReplyModal/ReplyModal';

// const TweetCard = ({ item }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openReplyModal, setOpenReplyModal] = useState(false);
//   const open = Boolean(anchorEl);
//   const [liked, setLiked] = useState(item?.liked);
//   const [likesCount, setLikesCount] = useState(item?.totalLikes || 0);

//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const handleOpenReplyModal = () => setOpenReplyModal(true);
//   const handleCloseReplyModal = () => setOpenReplyModal(false);

//   const handleLikeTweet = () => {
//     dispatch(likeTweet(item?.id));
//     setLiked(!liked);
//     setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
//   };

//   const handleCreateRetweet = () => dispatch(createReTweet(item?.id));

//   return (
//     <>
//       <div className="flex space-x-5 py-4 border-b">
//         <Avatar
//           onClick={() => navigate(`/profile/${item?.user.id}`)}
//           className="cursor-pointer"
//           src={item?.user?.avatar || 'https://www.vectorstock.com/royalty-free-vectors/profile-logo-vectors'}
//         />
//         <div className="w-full">
//           <div className="flex justify-between items-center">
//             <div className="flex space-x-2">
//               <span className='font-semibold'>{item?.user?.fullName}</span>
//               <span className='text-gray-600'>@{item?.user?.fullName?.replace(/\s+/g, '_').toLowerCase()}</span>
//             </div>
//             <div>
//               <MoreHorizIcon onClick={handleClick} className="cursor-pointer" />
//               <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
//                 <MenuItem onClick={handleClose}>Delete</MenuItem>
//               </Menu>
//             </div>
//           </div>

//           <div className="text-sm mt-2 mb-3">
//             {item?.content}
//           </div>

//           <div className="flex justify-between max-w-md text-gray-600">
//             <div
//               className="flex space-x-2 cursor-pointer hover:text-blue-500"
//               onClick={handleOpenReplyModal}
//             >
//               <ChatBubbleOutlineIcon fontSize="small" />
//               <span>{item?.totalReplies || 0}</span>
//             </div>

//             <div
//               className={`flex space-x-2 cursor-pointer hover:text-pink-600 ${liked ? 'text-pink-600' : ''}`}
//               onClick={handleLikeTweet}
//             >
//               {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
//               <span>{likesCount}</span>
//             </div>

//             <div
//               className="flex space-x-2 cursor-pointer hover:text-green-600"
//               onClick={handleCreateRetweet}
//             >
//               <RepeatIcon fontSize="small" />
//               <span>{item?.totalRetweets || 0}</span>
//             </div>

//             <div className="flex space-x-2 cursor-pointer">
//               <BarChartIcon fontSize="small" />
//               <span>{item?.totalViews || 0}</span>
//             </div>

//             <div className="cursor-pointer">
//               <FileUploadIcon fontSize="small" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <ReplyModal open={openReplyModal} handleClose={handleCloseReplyModal} tweet={item} />
//     </>
//   );
// };

// export default TweetCard;

import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Avatar, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Skeleton from "@mui/material/Skeleton";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TweetCard from '../HomeSection/TweetCard';
import ProfileModel from './ProfileModel';
import { useDispatch, useSelector } from 'react-redux';
import { findUserById, followUserAction, getUserProfile } from '../../Store/Auth/Action';
import { getUserTweets } from '../../Store/Tweet/Action';
import UserCard from "../Profile/UserCard";

const Profile = () => {
    const [value, setValue] = React.useState("1");
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const [OpenProfileModel, setOpenProfileModel] = React.useState(false);
    const handleOpenProfileModel = () => setOpenProfileModel(true);
    // const {auth, tweet} = useSelector(store=>store);
    const auth = useSelector((store) => store.auth);
    const tweet = useSelector((store) => store.tweet);

    const handleClose = () => setOpenProfileModel(false);
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector((store) => store.auth.user);
    console.log("id from params:", id);

    useEffect(() => {
        console.log("auth from store:", auth);
        console.log("user from store:", user);
    }, [auth, user]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === "4") {
            console.log("tab 4");
        } else if (newValue === "1") {
            console.log("Users tweets");
        }

    };


    // useEffect(() => {
    //     console.log("userId:", id)

    //     if (id) {
    //         dispatch(findUserById(id));
    //         dispatch(getUserTweets(id));
    //          dispatch(getUserProfile());
    //     } else {
    //         console.error("User ID from URL is undefined! Cannot fetch profile tweets.");
    //     }
    // }, [id, dispatch]);
    useEffect(() => {
        if (id) {
            dispatch(findUserById(id));

            if (auth.user?.id === parseInt(id)) {
                // if profile is current user
                dispatch(getUserTweets(auth.user.id));
            } else {
                // else, show tweets of other user
                dispatch(getUserTweets(id));
            }

            dispatch(getUserProfile());
        }
    }, [id, auth.user?.id, dispatch]);

    console.log("Followers array:", auth.findUser?.followers);
    console.log("Following array:", auth.findUser?.following);


    const handleFollowUser = async () => {
        const wasFollowed = auth.findUser?.followed;
        const existingFollowers = auth.findUser?.followers || [];

        await dispatch(followUserAction(id));

        const updatedUser = {
            ...auth.findUser,
            followed: !wasFollowed,
            followers: wasFollowed
                ? existingFollowers.slice(0, -1) // remove one
                : [...existingFollowers, { id: auth.user.id }] // add one
        };
        await dispatch(findUserById(id));
        dispatch({ type: "FIND_USER_BY_ID_SUCCESS", payload: updatedUser });

        const updatedAuthUser = {
            ...auth.user,
            following: wasFollowed
                ? auth.user.following?.filter(f => f.id !== parseInt(id))
                : [...(auth.user.following || []), { id: parseInt(id) }]
        };

        dispatch({ type: "LOGIN_USER_SUCCESS", payload: { user: updatedAuthUser, jwt: auth.jwt } });
        await dispatch(getUserProfile());
    };
    console.log("tweets.tweets", tweet.tweets)

    return (
        <div>
            <section className="z-50 items-center sticky top-0 bg-opacity-95">
                <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />
                <h1 className='py-5 text-x1 font-bold opacity-90 ml-5'>{auth.findUser?.fullName}</h1>

            </section>

            <section>
                <img className='w-[100%] h-[15rem] object-cover' src='https://cdn.pixabay.com/photo/2016/11/02/11/08/monk-1791113_640.jpg' alt='' />
            </section>
            <section className='pl-6'>
                <div className="flex justify-between items-start mt-5 h-[5rem]">
                    <Avatar className='transform -translate-y-24' alt='username' src={auth.findUser?.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                        sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
                    />
                    {auth.findUser?.req_user ? (<Button onClick={handleOpenProfileModel} variant='contained' sx={{ borderRadius: "20px" }}>Edit Profie</Button>) :
                        (<Button onClick={handleFollowUser} variant='contained' sx={{ borderRadius: "20px" }}>{auth.findUser?.followed ? "Unfollow" : "Follow"}</Button>

                        )}

                </div>
                <div>
                    <div className='flex items-center'>
                        <h1 className='font-bold text-lg'> {auth.findUser?.fullName} </h1>
                        {true && (<img className='ml-2 w-5 h-5' src="" />)}
                    </div>
                    <h1 className='text-gray-500'>@{auth.findUser?.fullName.split(" ").join("_").toLowerCase()} </h1>
                </div>
                <div className="mt-2 space y-3">
                    <p> {auth.findUser?.bio} </p>
                    <div className="py-1 flex space-x-5">
                        <div className="flex items-center text-gray-500">
                            <BusinessCenterIcon />
                            <p className='ml-2'>{auth.findUser?.website} </p>
                        </div>
                        <div className="flex items-center text-gray-500">
                            <LocationOnIcon />
                            <p className='ml-2'>{auth.findUser?.location} </p>
                        </div><div className="flex items-center text-gray-500">
                            <CalendarMonthIcon />
<p className="ml-2">
  Joined {auth.findUser?.started_at ? new Date(auth.findUser.started_at).toLocaleString('default', { month: 'long', year: 'numeric' }) : ''}
</p>

                        </div>
                    </div>
                    <div className="flex items-center space-x-5">
                        {/* <div className="flex items-center space-x-1 font-semibold">
  <span>{auth.findUser?.following?.length || 0}</span>
  <span className='text-gray-500'>Followers</span>
</div>  
<div className="flex items-center space-x-1 font-semibold">
  <span>{auth.user?.following?.length || 0}</span>
  <span className='text-gray-500'>Following</span>
</div> */}

                        <div className="flex items-center space-x-1 font-semibold">
                            <span>{auth.findUser?.following?.length || 0}</span> <span className='text-gray-500'>Following </span>
                        </div>
                        <div className="flex items-center space-x-1 font-semibold">
                            <span>{auth.findUser?.followers?.length || 0}</span><span className='text-gray-500'>Followers</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-5'>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="Tweets" value="1" />
                                <Tab label="Followers" value="2" />
                                <Tab label="Following" value="3" />
                                <Tab label="Liked Posts" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {tweet.tweets
                                .filter(item => item.user?.id === parseInt(id)) // additional filter to only show tweet in profile from my current id
                                .map(item => <TweetCard key={item.id || item._id} item={item} />)}
                        </TabPanel>
                        <TabPanel value="2">
                            {auth.findUser?.followers ? (
                                auth.findUser.followers.length > 0 ? (
                                    auth.findUser.followers.map((follower, index) => (
                                        <UserCard key={index} user={follower} />
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No followers yet.</p>
                                )
                            ) : (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} variant="rectangular" height={80} className="rounded-lg my-2" />
                                ))
                            )}
                        </TabPanel>

                        <TabPanel value="3">
                            {auth.findUser?.following?.length > 0 ? (
                                auth.findUser.following.map((following, index) => (
                                    <UserCard key={index} user={following} />
                                ))
                            ) : (
                                <p className="text-center text-gray-500">Not following anyone yet.</p>
                            )}
                        </TabPanel>


                        <TabPanel value="4">
                            {tweet.tweets
                                .filter(item =>
                                    item.likes?.some(likeUser => likeUser.id === parseInt(id))
                                )
                                .map(item => <TweetCard key={item.id || item._id} item={item} />)}
                        </TabPanel>

                    </TabContext>
                </Box>
            </section>
            <section><ProfileModel handleClose={handleClose} open={OpenProfileModel} /> </section>
        </div>
    );
};

export default Profile
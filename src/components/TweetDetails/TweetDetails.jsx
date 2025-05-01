import React, { useEffect } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import { Divider } from '@mui/material';
import TweetCard from '../HomeSection/TweetCard';
import { useDispatch, useSelector } from 'react-redux';
import { findTweetsById } from '../../Store/Tweet/Action';

const TweetDetails = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const dispatch = useDispatch();
    const {id} = useParams()
    const {tweet} = useSelector(store=>store)

    useEffect(()=>{
        if(id){
            dispatch(findTweetsById(id))
        }
    },[])
    
    return (
        <React.Fragment>
            <section className={'bg-white z-50  items-center sticky top-0 bg-opacity-95'}>
                <KeyboardBackspaceIcon className='cursor-pointer' onCLick={handleBack} />
                <h1 className='py-5 text-x1 font-bold opacity-90 ml-5'>Tweet</h1>

            </section>
            <section>
                <TweetCard item={tweet.tweet} />
                <Divider sx={{ margin: "2rem 0rem" }} />
            </section>
            <section>
                {tweet.tweet?.replyTweet.map((item) => <TweetCard item={item}/>)}
            </section>

        </React.Fragment>
    )
}

export default TweetDetails
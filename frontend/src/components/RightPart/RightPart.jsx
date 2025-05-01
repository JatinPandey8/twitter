import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from '@mui/material';
import SubscriptionModel from '../SubscriptionModel/SubscriptionModel';

const RightPart = () => {
    const [openSubscriptionModel, setOpenSubscriptionModel] = React.useState(false);
    const handleOpenSubscriptionModel = () => setOpenSubscriptionModel(true);
    const handleCloseSubscriptionModel = () => setOpenSubscriptionModel(false);
    const handleChangeTheme = () => {
        console.log("handleChangeTheme");
    }
    return (
        <div className='py-5 sticky top' >
            <div className='relative flex items-center'>
                <input type="text" className='py-3 rounded-full text-gray-500 w-full pl-12' />
                <div className="absolute top-0 left-0 pl-3 pt-3">
                    <SearchIcon className='text-gray-500' />
                </div>
                <Brightness4Icon className='ml-3 cursor-pointer' onClick={handleChangeTheme} />
            </div>
            <section className='my-5'>
                <h1 className='text-xl font-bold'>Get Verified</h1>
                <h1 className='font-bold my-2'> subscribe and Unlock New</h1>
                <Button variant='contained' sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px" }} onClick={handleOpenSubscriptionModel}>
                    Get Verified
                </Button>
            </section>
            <section className='mt-7 space-y-5'>
                <h1 className='font-bold text-x1 py-1' >Whats happening</h1>
                <div>
                    <p className='text-sm'> Fifia in 2026</p>
                    <p className='font-bold'>india vs pas</p>
                </div>
                {[1, 1, 1].map((item, index) => (
                    <div key={index} className='flex justify-between w-full'>
                        <div>
                            <p>Entertainment Trending</p>
                            <p className='font-bold'>#football</p>
                            <p>34.4K Tweets</p>
                        </div>
                        <MoreHorizIcon />
                    </div>
                ))} 
            </section>
            <section>
                <SubscriptionModel open={openSubscriptionModel} handleCLose={handleCloseSubscriptionModel} />
            </section>
        </div >
    );
};

export default RightPart;
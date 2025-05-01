import { Grid } from '@mui/material'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navigation from '../Navigation/Navigation';
import HomeSection from '../HomeSection/HomeSection';
import RightPart from '../RightPart/RightPart';
import Profile from '../Profile/Profile';
import TweetDetails from '../TweetDetails/TweetDetails';

export const Homepage = () => {
    return (
        <Grid container className='px-5 lg:px-36 justify-between'>
            <Grid item  lg={2.5} className='hidden lg:block '>
                <Navigation />  </Grid>
            <Grid item xs={12} lg={6} className='px-5 lg:px-9 '>
                <Routes>
                <Route path="*" element={<Navigate to="/home" />} />

                    <Route path="/" element={<HomeSection />} ></Route>
                    <Route path="/Home" element={<HomeSection />} ></Route>
                    <Route path="/profile/:id" element={<Profile />} ></Route>
                    <Route path="/tweet/:id" element={<TweetDetails />} ></Route>
                </Routes>
            </Grid>
            <Grid item lg={3} className='hidden lg:block '>
                <RightPart /></Grid>

        </Grid>
    )
}

export default Homepage;
import { Button, Grid } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import AuthModal from './AuthModal'

export const Authentication = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const handleOpenAuthModal = () => setOpenAuthModal(true);
  const handleCloseAuthModal = () => setOpenAuthModal(true);
  return (

    <div>
      <Grid className='overflow-y-hidden' container>
        <Grid className='hidden lg:block' item lg={7}>
          {/* <img className='w-full h-screen' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ27qqo-ULvV6BR7dbJvxqSFDYaTL9XIty5Q&s" alt="" /> */}
          {/* https://www.google.com/imgres?q=x%20background%20image&imgurl=https%3A%2F%2Fbsmedia.business-standard.com%2F_media%2Fbs%2Fimg%2Farticle%2F2023-07%2F24%2Ffull%2F1690203974-4358.png%3Fim%3DFaceCrop%2Csize%3D(826%2C465)&imgrefurl=https%3A%2F%2Fwww.business-standard.com%2Ftechnology%2Fapps%2Felon-musk-owned-twitter-changes-blue-bird-logo-to-x-as-part-of-rebranding-123072400653_1.html&docid=fel3QoB-h34MqM&tbnid=zwasFqSeE3HV_M&vet=12ahUKEwjl6dnO-PmIAxVCTWcHHYPYKJgQM3oECBYQAA..i&w=826&h=465&hcb=2&ved=2ahUKEwjl6dnO-PmIAxVCTWcHHYPYKJgQM3oECBYQAA       */}

          {/* https://www.google.com/imgres?q=x%20background%20image&imgurl=https%3A%2F%2Ffreebiehive.com%2Fwp-content%2Fuploads%2F2023%2F08%2FX-Logo.jpg&imgrefurl=https%3A%2F%2Ffreebiehive.com%2Fx-logo%2F&docid=X9heFLf-ozsUCM&tbnid=5EVcEOZsUdgO4M&vet=12ahUKEwjl6dnO-PmIAxVCTWcHHYPYKJgQM3oECFcQAA..i&w=850&h=530&hcb=2&ved=2ahUKEwjl6dnO-PmIAxVCTWcHHYPYKJgQM3oECFcQAA */}
          <div className="absolute top-[26%] left-[19%]">
            <svg xmlns="http://www.w3.or/2000/svg" height="300" width="300" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 462.799"><path fillRule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z" /></svg>-
          </div>


        </Grid>
        <Grid item className="px-10" lg={5} xs={12}>
          <h1 className="mt-10 font-bold text-7xl">Happening now</h1>
          <h1 className="font-bold text-3xl py-16">Join Twitter Now</h1>
          <div className="w-[60%]">
            <div className="w-full">
              {/* <GoogleLogin width={330} /> */}
              {/* <p className="py-5 text-center">OR</p> */}
              <Button onClick={handleOpenAuthModal} fullWidth variant="contained" size="large" sx={{
                borderRadius: "29px",
                py: "7px",
              }}>Create Account</Button>
              <p className="text-sm mt-2">By signing up you agree to the Terms of Service
                and Privacy Policy, including Cookie Use</p>
            </div>
            <div className="mt-10">
              <h1 className="font-bold text-xl mb-5"> Already have Account?</h1>
            </div>
            <Button onClick={handleOpenAuthModal} fullWidth variant="outlined" size="large" sx={{
              borderRadius: "29px",
              py: "7px",
            }}>  LOGIN  </Button>
          </div>


        </Grid>

      </Grid>
      <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal} />
    </div>
  )
}

export default Authentication
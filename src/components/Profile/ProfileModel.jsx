import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { uploadToCloud } from '../../Utils/uploadToCloud';
import { updateUserProfile } from '../../Store/Auth/Action';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: "none",
    border: "none",
    borderRadius: 4
};

export default function ProfileModel({ open, handleClose }) {
    //const [open, setOpen] = React.useState(false);
    const [uploading, setUploading] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const dispatch= useDispatch();
//    const {auth} = useSelector(store=>store)    
  const auth = useSelector((store) => store.auth);
  const [selectedImage, setSelectedImage] =React.useState("");
    const handleSubmit = (values) => {
        dispatch(updateUserProfile(values))
        console.log("handlesubmit", values);
        setSelectedImage("")

    }
    const formik = useFormik({
        initialValues: {
            fullName: auth.user?.fullName || "",
            website: auth.user?.website || "",
            location: auth.user?.location || "",
            bio: auth.user?.bio || "",
            backgroundImage: auth.user?.backgroundImage || "",
            image: auth.user?.image || "",
        },
        enableReinitialize: true,
        onSubmit: handleSubmit,
    });
    const handleImageChange = async (event) => {
        setUploading(true);
        const { name } = event.target
        const file = await uploadToCloud(event.target.files[0]);
        formik.setFieldValue(name, file);
        setSelectedImage(file);
        setUploading(false);
    }

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <IconButton onClick={handleClose} aria-label='delete'>
                                    <CloseIcon />
                                </IconButton>
                                <p className=''>Edit Profile</p>
                            </div>
                            <Button type="submit">Save</Button>
                        </div>
                        <div className="hideScrollBar -y-scroll overflow-x-hidden h-[80vh]">
                            <React.Fragment>
                                <div><div className="w-full">
                                    <div className="relative">
                                        <img className="w-full h-[12rem] object-cover object-center" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMRDxUTEhMSFRUVFxAVFRIQEhgbFRUWFRYWGBUYFhUYHSggGBolHRUVIzEhJSkrLy4uGSA3ODMtNyguLisBCgoKDg0OGhAQGi0lHyUtLS4tLS0tLSstLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKkBKQMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcCAf/EAEIQAAIBAgIGBwQHBwIHAAAAAAABAgMRBCEFBhIxQVEHEyJxgZGhMlJhokJygpKxwtEUI0NissHhMzUXNFNzo9Lw/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECBAMFBv/EADQRAQACAgAEAgcIAgIDAAAAAAABAgMRBBIhMQVBIlFhcZHR4RMyQoGhscHwM/EVUhQ0Q//aAAwDAQACEQMRAD8A7IdmUAAAAAAAAAAAAAAAAAAAAAAACNpCUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPFetGC2pyjFc5ySXmya1tadVjYhcZrfhKf8XbfKlFy+b2fU2Y/DuIv+HXv6fU2g8X0g/8ASoeNWf5Y/qbaeD/97/CPn8kbMF0gdq1ajZe9Slmvsy3+YyeEdPQt8fn9Da54PFwrU1UpyUoy3Nfg1wfwZ5GTHbHaa2jUpZigAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADHiMRCmtqcowXOclFebLVpa86rG/cIPG654On/EdR8qMXL5so+ptx+GcTf8ADr39Pr+iNoHG9Ir3UaHdKtL8kf8A2N2PwaPx3+Hzn5G0HjNb8ZV/i7C5UoqPze16m7H4dw9Pw79/X6fojaGq1ZTe1OUpP3ptt+bNdaxWNVjSHwD6gPpCVr6PdIuGJdFvs1U7LlOKun4xTXlyPK8UwxbF9p5x+0ph0c+fSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeatRRi5SajGKbcpOySW9t8ETWs2nUdxRdLdIqUnHDU1JL+JVuk+6Cs7d7Xce3g8GmY3ltr2R80cyt43XDGVd9ZwXKilH5l2vU9LH4bw1Pw79/X6fojaFq1JTe1KTk/ek235s2VrFY1EahD4B6IH1ED0iB6RA9RV3ZZt7kt77kRPrS+zi02mmmsmmrNP4rgRExMbgbGjcV1NenU9ycJPuTzXlc55qfaY7U9cDtNz49YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAo3SjpGUadKhF2VRynO3FQtsruu7/ZR7fguGJtbJPl0j8+/99qJc5R9Coz4XC1KrtThOb5U4OT9EUvkpSN3mI986TEb7JiOp+Ocdr9nlbk500/uuVzFPifCROuf9J+S/2dvUiK1GUJOM4yjKOTjJNNd6Zsratoi1Z3Cj5CLbSSbbySSzfciZnUbkSmB1fxNaezGjUTte9SOwrZK952vvW65ly8bgx15pvH5df2Wikz5JHROq3WYqph6tVU6lNRezGO1tppN7LbW5NeZlz+IcmGualdxP5a9/datNzqWlrFoaWEruDu4vOnO3tR/Vbn/k78HxVeIx80d/OPUravLK29GNH93Wnxc4Qv8AVjf855HjdvTpX2TP9+Drh7SpGkau3Xqy96pVl96Tf9z28NeXHWvqiP2cp7tcuh17VfF9bgqMt72VF98Ow/6b+J8rxmPkz2j27+PVaEoZgAAAAAAAAAAAAAAAAAAAAAAAAAAABz/pVwz/AHFXh+8pvvylH83ke94JePTp7p/j5IlQEe8q7Bqjj3LRcJxipSpwnHYvbalSuopuztdKOduJ8dx+GI4yazOomYnfsn5NNJ9FVf8AiPX20+po7HGHa2mvhO9k/snrf8Hi5dc079fTXw+rn9tKX6QcJTrYKGLirSj1TUrZunVtaL7nKL+GfMx+E5L4uInBPad/GFssRNdtnQ2Do6MwXX1V+8cYuckrzvP2acOW+3g2/hy4jLl47iPsqT6Pl6unnP8AfYmsRSu5NDa9Uq9ZUpU5U3N7MJOakm3uTyWy3u45jifCL4sc3rbeu/TRXLEzpD9IMZUMZRxFN7MnHKS96m/W8ZRVuRs8JmuXBfFbrG/0n6wrl6WiU6+q0tgeEZr/AMVVL1i/VPmssHp+H8R64/ePn/PsX6Xq86nUJYbA1NuLjJTryknwcEo+XY3jxG8ZuJryzuNRHx/2Y41VSNXNAzxkpKMowUFFylJN5yvZJLfufke5xnGV4aImY3txpXmaek8FKhWlSnbag0m1ud0mmvBo64c1cuOL17SiY1Ol36NMXelVpP6EozXdNWdvGHqeN4tj1et/XGvh/shcjykgAAAAAAAAAAAAAAAAAAAAAAAAAAAK9r9g+t0fU509mqvsvtfK5G/wzJycTX29Pj2/XSJ7OQo+tVdE6KsZ2a1F8HCovtLZl/TDzPnPHcXWmT3x/MfvLvhnvDZw/R3RU5SqVZyjtSapwSilG7ajKV23lldWOd/G8s1itKxE67z16+v+7Iwx5tDpB0/TnTWFoOMkmnUlD2Uo+zBNZPOzdt1kudu/hPB3rf7fJGvVvv180ZbxrUJ3SGHWk9GwdKSUuxNXeSqQTUoS5b5LyZgw3ngeLnnjp1j8p7SvMc9eis6v6m4n9phKtDq4U5Rm25xblsu6UVFve0s3bI9Pi/FMH2UxjnczGu0+fvc64531WLpGwm3g9vjSnGX2Zdh+sovwPN8Iycufl9cft1dMseio+rOmpYSup5uErRqRXGPNfzLevFcT3ON4WOIx8vnHaf763GluWXR9O42MtH1akW9mdGWy2mnaorRyea9pHzfC4pjiq0nvFv2aLT6O3MNF6Vq4aTlRnstqzVk018Uz6fPw+PNGskbZotMdmDFYiVSbnOTlKTu5Piy9KVpWK1jUQTO0/wBH2K2Mco8KkKkfJba/ofmYPEqc2DfqmPl/JDqB88kAAAAAAAAAAAAAAAAAAAAAAAAAAAB4xFFVIShL2ZxlF90lZ/iTW01tFo7x1HBq1FwnKEvahKUX3xbT9Ufc1tFoi0dp6qLBqBjOq0hTXCop0n9pXj80Ynn+K4ufhrezU/38plfHOrJPpOhOOJg9qXV1IK0HJ7KlBtStHcsnDzMvglqzimNRuJ7+ep9vxWy91NR7TkktDabr4WTdGdk/ahJXhLvjz+KszLxHC4uIjWSPz81q2mvZM4nX3FzjZdTC/wBKnB7XhtSaXkYqeD8PWdzuffPyiFpy2QWI0lWqR2Z1qso+7KpJrnuvZv4m6uDFSd1rET7ldzLc1XnQWKj+0KDp2nnU9mLSvFtcd1rPmcOOjLOGfst79ndNNb6pfXHWiOIj1NG/V3TlNq221uSTzUU88+KXLPF4fwE4Z+0yfe8o9X1XvffSFTueq5FyBbejjR7niXWt2aUZJPnOatZd0XK/euZ5fieWK4+Tzn9o+qYdJPCSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcg18wfVaQqcqmzVX2l2vmUz6zwzJz8NX2dPh9NKSg6FVwlGcXaUXGUXylF3T80bbVi0TWe09BsY/SlWu061WdRq9tp5K++0dy3LdyOWLBjwxrHWITMzPdrHVD6QPSIH0hJcqPUE5OyTbe5JXb7kiszqNyJjBarYuruoyiudW0PSWfkjJk47BTvb4dU6T+j+j2V069aKXGNFNt/bklbyZhy+Kx/86/H5fU0vGBwcKNNU6cVGMdyXq2+LfNnk5MlslptadylnKAAAAAAAAAAAAAAAAAAAAAAAAAAAADHWxEIe3OMfrSS/ErNojvK0Vme0Oe9J7pz6mrCcJNbdOWzJN2ylHdw9vzPd8Ez1mb49+3+J/hF8dqxuYV3Qmi+salJXXCL3eP6GTxPxubTOLhp99v4r8/h63o8LwP48vw+fyXOtq5Cvh5xcYqShJ05qKTjJLJZfRbyaPL4His2DLF+adecTMzv4+ftduLxY5r0jq5pSndXPu4l4jNTi5O0U23ujFXb8EJmIjciawOqeMq7qMornVah6S7XoY8nH8PTvbfu6/ROk/gujqbzrV4rnGlFv5pW/AwZPF6/gr8f7/KdJ/Bak4SnvhKo+dWbfyxsvQxZPEuIv2nXuTpO4XC06StThCC5Qior0MV72vO7TM+8ZSoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaOO0vSo5SleXuQzl48F42OV8tad5dseG9+0IDG6erVMqa6uPNZzfjw8PMy34m1vu9G3HwdY626oqSUc5vPe3J5vvbOOpnrLXEeUQi8fVVWySTV+zfmvpfoWpeazMVnW+nvhfkjzTWhcHs2udK00nm2syqWjZbkr/5YvPkpy7lUdDav4Wmo3h1jVv9WTaffFWXoehbxni7z0mIj2R/PWf1creHYqxrr7/70XfR06MY7NOMKf8AJGKivRJMr9vOXradz7Xm5eGvjnt0bpLOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPk5JK7aSW9t2S8SEorFawUY+y3Uf8AJ7P3nl5XON89K+13pw17exDYzSlatlfYj7sMn4y3v0Mt89rdujbj4Wtes9WlCionOKtcQ8YrFRpq7sjpyxC0RvsgY1XipJ7qaeX83+Dha++kLzHJ71kw2joStluI6KRMwnsJgbQ3+ZqxzMw5WtEWRusuNVCg7Zyl2V4734L+xyy25YacEc1o2q1HSPJnKMjZNd907o3Sqlk8mda5HG+KJWLBY95LOSeVuK7jRjyzvTyuL4Wupt2S5seQAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NNaUjhqW2823swjzl+isc8mSKRt1xY5yW1Ci4rG1cVO85Nq+UVlFdyPOvkteer1MWKtO0JXDYSyQiHeIZZRXOzLxVMq/pfTtOg9mo9mXC/HuIm8VWrjtfsp1fSUsXW2ItuCzlbly8f1OF7zLVFYxV3PdctDYBqPZ3clw+K4ruK1hlm256rTg6OzZev6l4OkpCVeyOsWmHLl85bmHwcUk5Ri5cW0m1fgnyN+PHFY693lZ+Itkt0no1cbq/hqrvKlFP3odl/Lv8SLcPjt3hOPjM2PpFvj1Rq1NpJ3VSovu/jY4/8Ah19ctP8AymTXaEzo/RsKK7N2/ek8/wDB3x4q07Mmfib5vvdm4dWcAAAAAAAAAAAAAAAAAAAAAAAAAAABRukHE/v6NP3YTn4zez+RmHi56xD0OCr0mWtoKnnuMsN6axjlBbSi3H6SjvXxsde0bTXrOkRpPEdjag7q3D8Raem4XivXUueadxkq/YklLOy4szWyS2UpWvVPam6uKjDdm3d+Jbc26yxZLRM+j2dCwGCSz9eJaIc9t9xLxCNtRTjUbXDd3jcdl5rOk1hn2FfesvI9HFbmrDxc9OW8wyHRxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADmmvFXa0jb3IUovvzn+dHncVO8j1OEjWP80joWFszjDUm8RU2VdM7wiFP1jrLZbhlJ70t0vDn8Uc79ujtj3vqh9X9CuU+smryeaT+j/kz1r5yvmzbjljs6Fo3A7K3HaIZdpeELFohWZV7WHTajUWGpe20nUkvoRe5fWfos+KItbl6R3aMOGZjnns2tF0WkitYXyTGtJijUs/hua/uacN5ifY83iMUWjfm3Tc8wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfQOPY/E9djq0+DqSS+rF7MfRI8rLO7zL2cUcuOIWnR/ZiIhfbBpfSFov8SZtpasqvg8P1tTbd/gm8vI495dbXnWl50Pg1FI6RGnGVgpQLxDnMsWkMSqVKU3nspu3N8Eu92XiW7RtNKze0Qqeg9DuCdWq9qrVbnJ85SzduSW5ckkUrSZ6z3ehkvr0Y7Qn4VXG0ZKz4dwtuvSWedW6w28LnFvy8CcbhljySh6TxQlAAAAAAAAAAAAAAAAAAAAAAAAAAAAABraUxXU0KtT3ITl4qLa9bFbTqJlalea0Q41of2jx99Xt+S0QxdkX5lNIrSMnUfwXAradr1hv6Gw1hWFplaMC8zpCEzTfZOkONu6A1p0jCDpUW86krtfy07Nv7zgUyzqIbOExzMzb1QlKdJQV3vyt8DvTpHVym037IatWdat2X2Y5OXN8UjPmtzW1DtSsVr1T9COzAtVkyTuUgtx6UdnjT3CUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFX6R8Z1eAlG+dWUILuvtv0hbxM/E21jaeFrvJ7nNtHM8vb1U3SeRZEtilhrsmINprCUbIvpEJTDwJhO0jFOx0hSXKOlnGSp4/DunnONN3jzU5tJfKc8sRMal6fAxPLNoWvR+MrVsNB1IypPZSltNXsvdtxYpNpq53pWt512SGj5KCslbldWv3Ea05XnaUoVdpqK47+7iXr1mIZsnSsylz03iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADm/StjL1aFFP2YzqSX1nsxv8Adl5mDjLdqvR4KvSbKzo2GZhhulP4ahfedIhWZS2FpHSIVSdCNiRJYa3/AMi9YVmWapMuiIc00o41tPNSV+rhTjF/zW2vzmTJMTkiHrYPR4aZhc6UEs3nbd8DXToyW3MNPG4i84q+7OxTLbeoVpHmmdHOKSS3tq75kY+8RDjm6VmZTJ6TxAAAAAAAAAAAAAAAAAAAAMYAAAAAAAAAByTpG/3GX1KX9J5nF/ferwf+Nq6JM9WqVhwx1hRKYbcWhVvQ4EjbpF4GWW4sr5uYVv8AeZf91/2ME/5vzepT/wBefdK7S3+Jthmn7kIWr/zFT6y/BHC/3pXr92Fl0F/qLuf4HfhvvsPG/wCL81gPQeOAAAAAAAAAAAAAAAAAAAB//9k=" alt=''></img>
                                        <input type='file' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                                            onChange={handleImageChange} name="backgroundImage" />
                                    </div></div>

                                </div>
                                <div className='w-full transform -translate-y-20 ml-4 h-[6rem]'>
                                    <div className='relative'>
                                        <Avatar sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
                                            src={ selectedImage ||  auth.user?.image || "https://www.google.com/imgres?q=avatar%20profile%20picture&imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20200224%2Foriginal%2Fpngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Fso%2Favatar-profile&docid=d9JT9hsoxU_7QM&tbnid=iFlCLn1t_stI0M&vet=12ahUKEwjs__XxgdKMAxVHzjgGHTThJeUQM3oECBwQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwjs__XxgdKMAxVHzjgGHTThJeUQM3oECBwQAA"}
                                        />
                                        <input className='absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer'
                                            onChange={handleImageChange} name='image' type='file' />
                                    </div>
                                </div>
                            </React.Fragment>
                            <div className="space-y-3">
                                <TextField fullWidth
                                    id="fullName"
                                    name="fullName"
                                    label="FullName"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                />
                                <TextField fullWidth
                                    multiline
                                    rows={4}
                                    id="bio"
                                    name="bio"
                                    label="Your Bio"
                                    value={formik.values.bio}
                                    onChange={formik.handleChange}
                                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                                    helperText={formik.touched.bio && formik.errors.bio}
                                />
                                <TextField fullWidth
                                    id="website"
                                    name="website"
                                    label="Education"
                                    value={formik.values.website}
                                    onChange={formik.handleChange}
                                    error={formik.touched.website && Boolean(formik.errors.website)}
                                    helperText={formik.touched.website && formik.errors.website}
                                /><TextField fullWidth
                                    id="location"
                                    name="location"
                                    label="Location"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                    helperText={formik.touched.location && formik.errors.location}
                                />
                                <div>
                                    <p className='text-lg'>Birth day . Edit</p>
                                    <p className='text-2xl'>october 06, 1999</p>
                                </div>
                                <p className='py-3 text-lg'>Edit professional profile</p>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

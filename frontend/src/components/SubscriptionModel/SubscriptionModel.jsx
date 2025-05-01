import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
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
    boxRadius: 4,
    p: 4,
};
const features = ["priorituze setting in convo an dsearc ",
    "priorituze setting in convo an dsearc  ",
    "priorituze setting in convo an dsearc  ",
    "priorituze setting in convo an dsearc  ",
    "priorituze setting in convo an dsearc  "
];

export default function SubscriptionModel({ handleClose, open }) {
    const [plan, setPlan] = React.useState("Annually");


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="flex items-center space-x-3">
                        <IconButton onClick={handleClose} aria-label="delete">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className='flex justify-center py-10'>
                        <div className="w-[80%] space-y-10">
                            <div className="p-5 rounded-md flex items-center justify-between bg-slate-400 shadow-lg">
                                <h1 className="text-xl pr-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. </h1>
                                <img className='w-24 h-25' src="https://icon2.cleanpng.com/20180620/bfu/kisspng-computer-icons-geometrix-5b2b198e5f24e0.5543536815295512463897.jpg" />
                            </div>
                            <div className="flex justify-between border rounded-full px-5 py-3 border border-gray-500">

                                <div>
                                    <span onClick={() => setPlan("Annualy")} className={`${plan === "Annuanly" ? "text-black" : "text-gray-400"} cursor-pointer`} >Annually</span>
                                    <span className="text-green-500 text-sm ml-5">SAVE 12%</span>
                                </div>
                                < p className={`${plan === "monthly" ? "text-black" : "text-gray-400"} cursor-pointer`}>Monthly</p>
                            </div>

                            <div className="space-y-3">
                                {features.map((item,index) => < div key={index} className="flex items-center space-x-5">
                                    <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                                    <p className='text-xs'> {item}</p>
                                </div>)}
                            </div>
                            <div className="cursor-pointer flex justify-center bg-gray-900 text-white rounded-full px-5 py-3">
                                <span className='line-through italix'>₹7800.00 </span>
                                <span className='px-5'>₹6800.00 </span>
                            </div>
                        </div>
                    </div>

                </Box>
            </Modal>
        </div >
    );
}

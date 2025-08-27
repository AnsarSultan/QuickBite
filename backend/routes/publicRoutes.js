import express from 'express'
const publicRouter = express.Router();

publicRouter.get('/',(req , res)=>{
    const timestamp = Date.now().toString().slice(-6); 
    const userid = 23;
    const trackingid = Number(`${userid}${timestamp}`)
    res.send(timestamp)
})

export default publicRouter
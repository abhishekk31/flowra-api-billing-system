const User=require('../Modal/modal.js')


exports.apiKeyAutho=async (req,res,next)=>{
    try{
        const apiKey=req.header('x-api-key')
        if(!apiKey){
            return res.status(401).json({message:'api key required'})
        }
        const user=await User.findOne({apiKey})
        if(!user){
            return res.status(401).json({message :'Invalid api key'})
        }
        req.user=user
        
        next();

    }
    catch(e){
        res.status(500).json({message : e.message})
    }
}
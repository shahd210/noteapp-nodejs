const errorMiddleware = (err,req ,res,next)=>{

    res.status(500).json({
        msg:"Server Error"
    })
}

module.exports =errorMiddleware;
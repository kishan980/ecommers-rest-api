const jwt =require("jsonwebtoken");


const verifiyTokn =(req,res,next)=>{
    const authHeader =req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SCERET,(error, user)=>{
            if(error){
                return res.status(403).json("Token is not valid!")
            }
            req.user =user 
            next();
        })
    } else {
        return res.status(401).json("You are not authecathication")
    }
}

const verifiyTokenAuthorization =(req,res,next)=>{
    verifiyTokn(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else {
            return res.status(403).json("You are not alowed to do that!")
        }
    })
}

const verifiyTokenAdmin =(req,res,next)=>{
    verifiyTokn(req,res, ()=>{
        if(req.user.isAdmin){
            next()
        } else {
            return res.status(500).json("You are not alowed to do that!")
        }
    })
}

module.exports ={verifiyTokn,verifiyTokenAuthorization,verifiyTokenAdmin}
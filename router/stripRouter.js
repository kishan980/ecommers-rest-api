const router = require("express").Router();
const stripe = require("stripe")(process.env.SECRET_KEY)

router.post("/payment", (req,res)=>{
    stripe.changes.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd"
    },(stripeErr,stripeRes=>{
            if(stripeErr){
                return res.status(500).json(stripeErr)
            } else {
                return res.status(201).json(stripeRes)
            }
        }
    ))
})
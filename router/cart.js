const router=require("express").Router();
const CartModel =require("../model/cart.model");
const { verifiyTokn, verifiyTokenAuthorization, verifiyTokenAdmin } = require("./verifiyToken");

router.post("/", verifiyTokn,async(req,res) =>{
    try{
        const newCard = new CartModel(req.body);
        const saveCard = await newCard.save()
        return res.status(201).json(saveCard)
    }catch(error){
        return res.status(500).json(error)
    }
})

router.get("/", verifiyTokenAuthorization,async(req,res)=>{
    try{

    }catch(error){

    }
})


router.put("/:id", verifiyTokenAuthorization, async(req,res)=>{
    try{
        const updateCart = await CartModel.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
            )
            return res.status(200).json(updateCart)
        }catch(error){
            return res.status(500).json(error)
        }
    })

router.delete("/:id", verifiyTokenAuthorization, async(req,res)=>{
    try{
        await CartModel.findByIdAndDelete(req.params.id)
        return res.status(200).json("delete cart...")
    }catch(error){
        return res.status(500).json(error)
    }
})

router.get("/find/:userId", verifiyTokenAdmin, async (req,res)=>{
    try{
        const cardDetails = await CartModel.findOne({userId:req.params.userId})
        return res.status(200).json(cardDetails)
    }catch(error){
        return res.status(500).json(error)
    }
})

router.get("/", verifiyTokenAdmin, async(req,res) =>{
    try{
        const carts =await CartModel.find()
        return res.status(200).json(carts)
    }catch(error){
        return res.status(500).json(error)
    }
})


module.exports=router;
const { verifiyTokn, verifiyTokenAdmin, verifiyTokenAuthorization } = require("./verifiyToken");
const OrderModel = require("../model/order.model");
const router = require("express").Router();
const mongoose = require("mongoose");


router.post("/", verifiyTokn, async (req, res) => {
  const newOrder = new OrderModel(req.body);
  try {
    const saveOrder =await  newOrder.save();
    return res.status(201).json(saveOrder);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/:id", verifiyTokenAdmin, async (req, res) => {
  try {
        const updateOrder = await OrderModel.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            {new:true}
        )
        return res.status(200).json(updateOrder)
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/:id", verifiyTokenAdmin, async(req,res)=>{
    try{
        await OrderModel.findByIdAndDelete(req.params.id)
        return res.status(200).json("Order are delete")
    }catch(error){
        return res.status(500).json(error)
    }
})

router.get("/find/:userId", verifiyTokenAuthorization, async(req,res)=>{
    try{
        const orders = await OrderModel.findById(mongoose.Types.ObjectId({userId:req.params.userId}))
        return res.status(200).json(orders)
    }catch(error){
        return res.status(500).json(error)
    }
})


router.get("/", verifiyTokenAdmin, async(req,res) =>{
    try{
        const orders =await OrderModel.find();
        return res.status(200).json(orders)
    }catch(error){
        return res.status(500).json(error)
    }
})

router.get("/income", verifiyTokenAdmin, async(req,res)=>{
    const date=new Date();
    const lastMonth= new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
    try{
        const income =await OrderModel.aggregate([
            {
                $match:{createdAt:{$gte:previousMonth}}
            },
            {
                $project:{
                    month:{ $month:"$createdAt"},
                    sales:"$amount"
                }
            },{
                $group:{
                    _id:"$month",
                    total:{$sum:"sales"}
                }
            }
        ])
        return res.status(200).send(income)
    }catch(error){
        return res.status(500).json(error)
    }
})
module.exports = router;

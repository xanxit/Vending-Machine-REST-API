const express= require('express');
const Machine= require('../models/machine')
const resetRouter =express.Router();


resetRouter.get('/initialset',async(req,res)=>{
    const initialAddition=await Machine.insertMany([{drink:"Coke",quantity:100,price:25},{drink:"Pepsi",quantity:100,price:32},{drink:"Soda",quantity:100,price:47}]);
    res.send({initialAddition});
})
    /**
 * @swagger
 * /api/reset/:id:
 *   put:
 *     summary: Updates the stock
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/users'
 *     responses:
 *       200:
 *         description: Update Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/users'
 *       500:
 *         description: Some server error
 */
resetRouter.put('/reset/:id',async(req,res)=>[

    Machine.findOneAndUpdate({_id:req.params.id},{
        $set:{
            quantity:req.body.quantity,
            price:req.body.price
        }
    }).then(result=>{
        res.json({
            updated_list:result
        }).catch(err)
        {
            res.json(err)
        }
    })
])


module.exports=resetRouter;
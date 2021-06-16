const express= require('express');
const User = require('../models/users')
const refundRouter = express.Router();
refundRouter.get('/refund',async(req,res)=>{
  User.findOneAndDelete(
    { name: req.body.name, drink: req.body.drink },
    function (err, user) {
      if (user) {
        const price = user.money - user.change;
        res.json(`Here's Your Refund ${price}`);
      } else {
        res.json("User Doesn't exist");
      }
    }
  );
  /**
   * @swagger
   * /api/refund:
   *   get:
   *     summary: Gives the user its refund back
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/models/users'
   *     responses:
   *       200:
   *         description: Refund Successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/models/users'
   *       500:
   *         description: Some server error
   */
})



module.exports=refundRouter;

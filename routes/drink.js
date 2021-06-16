const express = require("express");
const User = require("../models/users");
const Machine = require("../models/machine");
const drinkRouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user who bought the item
 *         drink:
 *           type: string
 *           description: Drink That he bought
 *         money:
 *           type: number
 *           description: The money he gave
 *         change:
 *          type: number
 *          description: the change he recieved
 *       example:
 *          name:Sanchit
 *          drink:Soda
 *          money:47
 *          change:0
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Machine:
 *       properties:
 *         drink:
 *           type: string
 *           description: The drink in the wending machine
 *         quantity:
 *           type: string
 *           description: total quantity of the drink
 *         price:
 *           type: number
 *           description: The price of the drink
 *       example:
 *          drink:Soda
 *          quantity:100
 *          price:47
 */

drinkRouter.post(
  "/",
  async (req, res) => {
    const penny = req.body.penny;
    const nickel = req.body.nickel;
    const dime = req.body.dime;
    const quarter = req.body.quarter;
    const drink = req.body.drink;
    const user_name = req.body.name;
    const money_given = penny * 1 + nickel * 5 + dime * 10 + quarter * 25;
    let price_taken;

    Machine.findOne({ drink: req.body.drink }, function (err, machine) {
      if (machine) {
        price_taken = machine.price;
        machine.quantity = machine.quantity - 1;
        Machine.findOneAndUpdate(
          { drink: req.body.drink },
          { quantity: machine.quantity - 1 }
        );
        if (money_given < 0) {
          res.json("");
        } else {
          if (money_given >= price_taken) {
            const change_given = money_given - price_taken;
            const user = new User({
              drink: req.body.drink,
              money: money_given,
              change: change_given,
              name: user_name,
            });
            user.save();

            if (machine.quantity !== 0) {
              if (change_given > 0) {
                res.json(
                  `Here's your change: ${change_given}! Thank you for shopping!!`
                );
              } else {
                res.json(` Thank You for shopping! Here's Your ${drink}`);
              }
            }
          } else {
            const left = price_taken - money_given;
            res.json(`You need to give  ${left} to buy this product`);
          }
        }
      } else if (err) {
        res.json(err);
      } else {
        res.json("Drink Doesn't exist");
      }
    });
  }
  /**
   * @swagger
   * /api/:
   *   post:
   *     summary: Takes the value of money given and drinks taken at last returns back the change to the user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/models/users'
   *     responses:
   *       200:
   *         description: Order Successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/models/users'
   *       500:
   *         description: Some server error
   */
);
module.exports = drinkRouter;

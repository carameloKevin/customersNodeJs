import express from "express"
import {getCustomers, getFirstCustomer, getCustomer, createCustomer} from '../database.js'
 
var router = express.Router();

router.get("/all", async (req, res) => {
    const customers = await getCustomers()
    res.send(customers)
  });

router.get("/first", async (req, res) => {
    const customer = await getFirstCustomer()
    res.send(customer)
})

export default router;
import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config({path: './.env'})

const pool = mysql.createPool({
    host  : process.env.MYSQL_HOST, //'127.0.0.1',
    user  : process.env.MYSQL_USER, //'root', 
    password: process.env.MYSQL_PASSWORD, //'0451',
    database: process.env.MYSQL_DB, //'classicmodels'
    // host  : '127.0.0.1',
    // user  : 'root', 
    // password: '0451',
    // database: 'classicmodels'
  }).promise()

export async function getCustomers(){
    const [rows] = await pool.query('SELECT * FROM customers')
    return rows
}

export async function getCustomer(id){
    const [customer] = await pool.query(`
    SELECT * 
    FROM customers 
    WHERE customerNumber = ?
    `, [id])
    return customer[0]
}

export async function createCustomer(customerNumber, salesRepEmployeeNumber){
    const result = await pool.query(`
    INSERT INTO customers(customerNumber, customerName, contactLastName, contactFirstName,phone,addressLine1,addressLine2,city,state,postalCode,country, salesRepEmployeeNumber, creditLimit)
    VALUES(?,'Caramelos Inc', 'Berg', 'Kevin', '123', 'Guinazu', 'Lainez', 'Neuquen', 'Neuquen', '8300', 'Argentina', ?, '1000')
    ` , [customerNumber, salesRepEmployeeNumber])

    return result
}

export async function getFirstCustomer(){
    const firstCustomer = await pool.query(`
    SELECT * 
    FROM customers 
    LIMIT 1
    `)
    return firstCustomer[0];
}
const result = await getCustomer(11100);    //customer 424, salesRepEmployeeNumber 1286
//const result = await createCustomer(11100, 1286);

console.log(result);
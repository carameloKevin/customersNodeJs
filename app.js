import express from 'express';
import customerRoute from './routes/Customer.js'

const app = express();
const port = 5000;

app.use('/customer', customerRoute);


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something Broke')
})

app.listen(port, () => {
  console.log('Server is running on port %d', port)
})
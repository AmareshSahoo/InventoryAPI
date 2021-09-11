const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const initData = require('./seeder')
// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const routes = require('./routes/routes');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors());

app.get("/", (req, res) => { res.status(200).send("WELCOME TO INVENTORY API BY AMARESH SAHOO") });

// routers
app.use('/api/v1/', routes);
app.use('/api/v1/initdata', (req,res) =>{
  const result = initData();
  console.log("Init data",result)
  if(result){
    res.status(200).json({success:true, message:"Data Imported"})
  }else{
    res.status(400).json({success:false, message:"Something went wrong"})
  }
})

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
});

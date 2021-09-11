const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const User = require('./models/user');
const Airport = require('./models/airport');
const Aircraft = require('./models/aircraft');
const Transaction = require('./models/transaction');


// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/Users.json`, 'utf-8')
  );
  const airports = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/airport.json`, 'utf-8')
    );
    
    const aircrafts = JSON.parse(
      fs.readFileSync(`${__dirname}/_data/aircrafts.json`, 'utf-8')
      );
      
      const transactions = JSON.parse(
        fs.readFileSync(`${__dirname}/_data/transaction.json`, 'utf-8')
        );
        
        
        // Import into DB
        const initData = async () => {
          try {
            // await User.deleteMany();
            await Airport.deleteMany();
            await Aircraft.deleteMany();
            await Transaction.deleteMany();
            
            // await User.create(users);
            await Airport.create(airports);
            await Aircraft.create(aircrafts);
            
            console.log('Data Imported...');
            return true;
          } catch (err) {
            console.error(err);
          }
        };
        
        // initData();

module.exports = initData;
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const path = require('path');
require('dotenv').config();

const app=express();

const alienRouter=require('./routes/alien');

app.use(bodyParser.json());
app.use(cors());
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
// app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.static(path.join(__dirname , 'public')))

app.get('/',(req,res)=>{
  res.render('index');
})
app.use('/alien',alienRouter);

mongoose.connect(process.env.Mongoo).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server running on port 3000');
  });

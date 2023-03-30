const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary')
const cors = require('cors');
// app.use(cors());

app.use(cors({
    origin: 'https://askfurniture.in',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.get("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send("API is Running....");
})
dotenv.config({ path: 'backend/.env' })
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
// console.log(process.env.CLOUDINARY_API_KEY)
//handle Uncaught exceptions like clg(a)
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down due to uncaught exception")
    process.exit(1);
})


//Setting up config file
dotenv.config({ path: '.env' })


const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV}`);
    })
)

//Handle Unhandled Promise rejection like we remove char in .dotend
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to unhandled rejection")
    server.close(() => {
        process.exit(1)
    })
})
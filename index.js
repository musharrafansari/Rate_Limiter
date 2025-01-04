const express =require("express")
const rateLimit  =require("express-rate-limit")
const helmet = require("helmet")
const app = express()

app.use(helmet())
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      status: 429,
      message: 'Too many requests, please try again later.',
    },
})

app.use("/test",apiLimiter)

//  Rate limiter implemented on specfiv route only
app.get("/api/user",(req,res)=>{
    res.json({
        name : "Arif"
    })
})
app.get("/test/user",(req,res)=>{
    res.json({
        name:"musharraf"
    })
})


let port = 3000 || process.env
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})
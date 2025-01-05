const { error } = require("console")
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


app.get("/writeFile",(req,res)=>{
    const fs = require("fs")

    // const file = fs.createWriteStream("./bigFile.txt")

    // for(let i=0;i<1e6;i++){
    //     file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n')
    // }

    // file.end()
    ///////// asynchronous way of reading file
    // fs.readFile("./bigFile.txt", (err, data) => {
    //     if (err) {
    //         console.error("Error reading file:", err.message);
    //         return;
    //     }
    //     console.log("File content:", data.toString());
    // });
    // console.log("file write done.....")

    // synchronous way of reading file
    // try {
        
    //     let data=  fs.readFileSync("./bigFile.txt","utf-8")
    //     console.log(data)
    //     res.send("success.......")
    // } catch (error) {
    //     console.log("error",error)
    // }



    //Readable   Streams-----------------

    // const readSreams = fs.createReadStream("./bigFile.txt","utf-8")

    // readSreams.on("data",(chunks)=>{
    //     console.log("stream---->",chunks)
    // })

    // // return
    // readSreams.on("end",()=>{
    //     console.log("finish---------->")
    // })


    // readSreams.on("error",(err)=>{
    //     console.log("error---->",err)
    // })

    ////

    // Reading big file and writing in different file using streams

    let readStream = fs.createReadStream("./bigFile.txt","utf-8")

    let writeStream = fs.createWriteStream("./newFile.txt")

    readStream.pipe(writeStream)

    readStream.on("end",()=>{
        console.log("File is successfully copied..")
    })

    readStream.on("error",(err)=>{
        console.log("error-->",err)
    })

    writeStream.on("error",(err)=>{
        console.log("error-->",err)

    })
    res.send("success.............")
})



let port = 3000 || process.env
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})
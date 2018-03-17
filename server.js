
var http =require("http")
var url = require('url');
var express=require("express")
var remote_ip="61.171.2.75"
var app= express()
app.get("/set_ip",(req,res)=>{
    var ip=req.ip
    if(ip.substr(0,7)=="::ffff:"){
        remote_ip=ip.substr(7)
    }
    res.type("html")
    res.end("your ip is "+ip)
})
app.get("/get_config",(req,res)=>{
    var apps=[]
    apps.push({
        name:"下载器",
        url:"http://"+remote_ip+":9999",
        newWindow:true
    })
    res.type('json')
    res.end(JSON.stringify(apps))
})
app.use(express.static("dist"))
app.get("/")
app.listen(80,()=>{
    console.log("server start")
})
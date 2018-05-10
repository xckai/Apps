
var http =require("http")
var url = require('url');
var express=require("express")
var TM=require("./Server/transmission-client")
var remote_ip="58.33.175.118"
var port=9091
var app= express()
app.get("/set_ip",(req,res)=>{
    var ip=req.ip
    if(ip.substr(0,7)=="::ffff:"){
        remote_ip=ip.substr(7)
    }
    res.type("html")
    res.end("your ip is "+ip)
})
app.get("/api/get_config",(req,res)=>{
    var apps=[]
    apps.push({
        name:"Transmission",
        url:"http://"+remote_ip+":"+port,
        newWindow:true
    })
    apps.push({
        name:"Sync",
        url:"http://"+remote_ip+":8888",
        newWindow:true
    })
    res.type('json')
    res.end(JSON.stringify(apps))
})
app.use(express.static("dist"))
app.get("/api/search/:key",(req,res)=>{
    key=req.params.key
  
    if(key){
        let rs=[]
        try{
            rs.push({name:"haha",size:"1.3g",createTime:new Date,popular:2222,infoCode:"bd6nnd7zfaezab7lxske2rnk2xqj7ro3j"})
        }catch(e){

        }finally{
            res.type('json')
            res.end(JSON.stringify(rs))
        }
    }
})
app.post("/api/addurltask/:url",(req,res)=>{
    var tm_client=new TM(remote_ip,port)
    url=req.params.url
    tm_client.addURLTask(url).then(e=>{
        res.type("json")
        res.end(e)
    },e=>{
        res.type("json")
        res.end(e)
    })
})
app.listen(8080,()=>{
    console.log("server start")
})
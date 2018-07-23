var express=require("express");
var log4js =require('log4js');
var _ = require("lodash");
var path = require('path');
var exec = require('child_process').exec;
var app= express();
var PORT=80;
log4js.configure({
      appenders: {
        out: { type: 'stdout' },
        app: { type: 'file', filename: 'application.log' }
      },
      categories: {
        default: { appenders: [ 'out', 'app' ], level: 'info' }
      }
  });
var logger = log4js.getLogger();
logger.level='info'
var fs=require('fs');
var config_file="./config.json";
var config={apps:[]}
//loading config file
try{
    config=JSON.parse(fs.readFileSync(path.resolve(config_file)));
    if(config.logLevel){
        logger.setLevel(config.logLevel)
    }
    if(config.port){
        PORT=config.port
    }
}
catch (error){
    logger.error("无法读取配置文件")
}
app.listen(PORT,'0.0.0.0',()=>{
    logger.info("服务器监听端口："+PORT)
})
app.use(express.static("dist"))
app.get("/api/apps",(req,res)=>{
    res.type("json")
    res.end(JSON.stringify(_.map(config.apps,(m)=>{
        return m
    })))
})
app.get("/api/status/:app",(req,res)=>{
    var app=req.params.app;
    var app_config=_.find(config.apps,{id:app})
    if(app_config){
        exec(app_config.status,{encoding:'utf-8'},(err,out)=>{
            if(err){
                logger.error("应用调用错误:"+app+"----"+_.toString(err))
            }
         
            res.status(200).send({id:app,exec:out,code:0})
        })
    }else{
        res.status(500).send({id:app,error:'应用不存在',code:0})
        logger.error("应用未配置:"+app)
    }
})
app.post('/api/start/:app',(req,res)=>{
    var app=req.params.app;
    var app_config=_.find(config.apps,{id:app})
    if(app_config){
        exec(app_config.start,{encoding:'utf-8'},(err,out)=>{
            if(err){
                logger.error("应用启动错误;"+app+'----'+_.toString(err))
            }
          
            res.status(200).send(out);
        })
    }else{
        res.status(500).send({error:"应用不存在"});
        logger.error("应用未配置:"+app);
    }
})
app.post('/api/stop/:app',(req,res)=>{
    var app=req.params.app;
    var app_config=_.find(config.apps,{id:app})
    if(app_config){
        exec(app_config.stop,{encoding:'utf-8'},(err,out)=>{
            if(err){
                logger.error("应用关闭错误;"+app+'----'+_.toString(err))
            }
           
            res.status(200).send(out);
        })
    }else{
        res.status(500).send({error:"应用不存在"});
        logger.error("应用未配置:"+app);
    }
})





// app.get("/set_ip",(req,res)=>{
//     var ip=req.ip
//     if(ip.substr(0,7)=="::ffff:"){
//         remote_ip=ip.substr(7)
//     }
//     res.type("html")
//     res.end("your ip is "+ip)
// })
// app.get("/api/get_config",(req,res)=>{
//     var ip=req.ip
//     if(ip.substr(0,7)=="::ffff:"){
//         ip=ip.substr(7)
//     }
//     ip= ip==remote_ip?"192.168.50.75":remote_ip
//     var apps=[]
//     apps.push({
//         name:"Transmission",
//         url:"http://"+ip+":"+port,
//         newWindow:true
//     })
//     apps.push({
//         name:"Sync",
//         url:"http://"+ip+":8888",
//         newWindow:true
//     })
//     apps.push({
//         name:"Aria",
//         url:"http://"+ip+":8123",
//         newWindow:true
//     })
//     apps.push({
//         name:"File Server",
//         url:"http://"+ip+":8456",
//         newWindow:true
//     })
//     res.type('json')
//     res.end(JSON.stringify(apps))
// })
// app.use(express.static("dist"))
// app.get("/api/search/:key",(req,res)=>{
//     key=req.params.key
  
//     if(key){
//         let rs=[]
//         try{
//             rs.push({name:"haha",size:"1.3g",createTime:new Date,popular:2222,infoCode:"bd6nnd7zfaezab7lxske2rnk2xqj7ro3j"})
//         }catch(e){

//         }finally{
//             res.type('json')
//             res.end(JSON.stringify(rs))
//         }
//     }
// })
// app.post("/api/addurltask/:url",(req,res)=>{
//     var tm_client=new TM(remote_ip,port)
//     url=req.params.url
//     tm_client.addURLTask(url).then(e=>{
//         res.type("json")
//         res.end(e)
//     },e=>{
//         res.type("json")
//         res.end(e)
//     })
// })
// app.listen(80,()=>{
//     console.log("server start")
// })
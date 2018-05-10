const http=require("http")
const q=require("q")
module.exports =class Client{
    constructor(host,port){
        this.host=host
        this.port=port
        this.username="xckai"
        this.password="123465"
    }
   
    getSessionId(){
        let defer=q.defer()
        var options={
            method:'POST',
            hostname:this.host,
            port:this.port,
            path:"/transmission/rpc",
            headers:{
                "Authorization":"Basic "+  new Buffer(this.username + ":" + this.password).toString('base64')
            }
        }
        const req=http.request(options,(res)=>{
                if(res.statusCode==409 || res.statusCode==200){
                     defer.resolve(res.headers["x-transmission-session-id"])
                }else{
                    defer.reject(res.statusMessage)
                }
        })
        req.on("error",(e)=>{
            defer.reject(e.message)
        })
        req.end()
       
        return defer.promise
        
    }
    addURLTask(url){
        var defer=q.defer()
        url=url.toLowerCase()
        if (url.match(/^[0-9|a-f]{40}$/i)) {
            url = 'magnet:?xt=urn:btih:' + url;
        }
        var config={
            method: "torrent-add",
            arguments: {
                filename: url,
                paused: false,
                "download-dir":"/westerndisk/download"
            }
        }
        this.exec(config).then(defer.resolve,defer.reject)
        return defer.promise
    }
    exec(config){
        var defer=q.defer()
        this.getSessionId().then((sessionID)=>{
            var options={
                method:'POST',
                hostname:this.host,
                port:this.port,
                path:"/transmission/rpc",
                headers:{
                    "Authorization":"Basic "+  new Buffer(this.username + ":" + this.password).toString('base64'),
                    "x-transmission-session-id":sessionID
                }
            } 
            const req=http.request(options,(res)=>{
                    res.setEncoding('utf8');
                    res.on("data",defer.resolve)
                 
            })
            req.on("error",(e)=>{
                defer.reject(e.message)
            })
            req.write(JSON.stringify(config))
            req.end()
        })
        return defer.promise
    }
    

}


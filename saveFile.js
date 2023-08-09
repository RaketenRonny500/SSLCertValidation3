const url = require('url')
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res)=>{
    switch(url.parse(req.url).pathname){
        case '/saveFile':
            let body = ''

            //saving post data into variable body
            req.on('data', chunk=>{
                body+= chunk.toString()
            })
            req.on('end', ()=>{
                //reading json file
                fs.readFile(__dirname+'/certList.json', (err, data)=>{
                    if (err) throw err
                    dataJson = JSON.parse(data) //object with your link-data.json file
                    postData = JSON.parse(body) //postData is the variable containing your data coming from the client.
                    dataJson.push(postData)//adds the data into the json file.

                    //Update file
                    fs.writeFile(__dirname+'/certList.json', JSON.stringify(dataJson), (err)=>{
                        if(err) console.log(err)
                        res.end()
                    })
                })
            })
    }
})

server.listen(5000, ()=>{
    console.log('Server listening at port 5000!')
})
const token = "7F18B7C8A5016BFC9F99F34CF511C46E"


function auth(req, res, next) {
    const tk = req.headers["authorization"]             //extract "authorization" header from HTTP req
    console.log(tk)
    if (!tk || tk!=="Bearer "+token) {                  //check if token matches token with Bearer prefix
        return res.status(401).send("unauthorized")
    }
    next()                                              //pass control to next middleware function
}

module.exports = auth

const token = "7F18B7C8A5016BFC9F99F34CF511C46E"


function auth(req, res, next) {
    const tk = req.headers["authorization"]
    console.log(tk)
    if (!tk || tk!=="Bearer "+token) {
        return res.status(403).send("unauthorized")
    }
    next()
}

module.exports = auth
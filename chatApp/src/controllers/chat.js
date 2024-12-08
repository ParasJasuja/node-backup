exports.sample = (req, res, next) => {
    res.sendFile("/home/parasjasuja/Desktop/nodejs/chatApp/index.html")
}
exports.connect = (req, res, next) => {
    res.status(200).json({ "success": true })
}
const express = require('express')
const path = require('path')
const cors = require('cors')
const multer = require('multer')
const morgan = require('morgan')

const GoogleSpread = require("./GoogleSpread")
const setting = require('./Setting')
const Json = require('./db/method/json')
const call = require('./Callback')

const filePath = path.join(__dirname);

const app = express()
const route = express.Router()
const upload = multer()

app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

// роут
route.post("/gettable", upload.none(), call.gettable)
route.get("/test", upload.none(), (req, res) => { res.status(200).json("test") })
app.use('/api', route)

app.listen(setting.port, () => {
    console.log(`сервер запущен на порте: ${setting.port}`)
})

// таблица
GoogleSpread.run(filePath)

module.exports.get = async (file) => { return await Json.get(filePath + `/db/${file}.json`)}
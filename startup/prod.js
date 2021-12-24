const compression = require("compression")
const helmet = require("helmet");



module.exports = app =>{
    app.use(compression())
    app.use(helmet())
}
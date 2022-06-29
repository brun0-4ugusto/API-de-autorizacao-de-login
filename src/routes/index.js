const bodyParser = require("body-parser");
const app = require("..");
const usuario = require('./usuarioRoute')
const estrategiasAutenticacao = require("../controllers/EstrategiasAutenticacao")

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false }),
        usuario
    );

    app.get("/", (req, res) => {
        res.send("Olá");
    });
};

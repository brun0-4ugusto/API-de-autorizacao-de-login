const database = require("../models");
const jwt = require("jsonwebtoken");

class UsuarioController {
    static oi(req,res){
        res.status(200).send("oi");
    }
    static criaTokenJWT(email) {
        const payload = {
            email: email,
        };
        const token = jwt.sign(payload, "senha-secreta",{expiresIn:'30m'});
        return token
    }
    static async buscaPorUsuario(email) {
        try {
            return await database.usuarios.findOne({
                where: { email: email },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    static async login(req, res) {
        try {
            const token = UsuarioController.criaTokenJWT(req.user.email)
            res.set('Authorization',token)
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = UsuarioController;

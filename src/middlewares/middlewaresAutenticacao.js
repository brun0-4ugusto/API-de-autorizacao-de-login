const passport = require("passport");

module.exports = {
    local: (req, res, next) => {
        passport.authenticate("local", { session: false }, (erro, usuario, info) => {
            if(erro && erro.message == "E-mail ou senha inválidos"){
                return res.status(401).json({
                    erro:erro.message
                })
            }
            if(erro){
                return res.status(500).json({erro:erro.message})
            }
            if(!usuario){
                return res.status(401).json();
            }
            req.user = usuario;
            return next()
        }
        )(req,res,next);
        
    },
};

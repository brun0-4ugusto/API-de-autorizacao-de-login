const passport = require("passport");
const UsuarioController = require("./UsuarioController");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function verificaUsuario(usuario) {
    if (!usuario) {
        throw new Error("E-mail ou senha inválidos");
    }
}

async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new Error("E-mail ou senha inválidos");
    }
}

/* passport.use(
    new BearerStrategy(async (token, done) => {
        try {
            const payload = jwt.verify(token, "senha-secreta");
            const usuario = await UsuarioController.buscaPorUsuario(payload.email);
            done(null, usuario);
        } catch (error) {
            done(error)
        }
    })
); */

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "senha",
            session: false,
        },
        async (email, senha, done) => {
            try {
                const usuario = await UsuarioController.buscaPorUsuario(email);
                verificaUsuario(usuario);
                await verificaSenha(senha, usuario.senha);
                done(null, usuario);
            } catch (error) {
                done(error);
            }
        }
    )
);

module.exports = passport;

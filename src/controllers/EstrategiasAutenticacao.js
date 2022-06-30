const passport = require("passport");
const UsuarioController = require("./UsuarioController");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");

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

function tentativasLogin(cache, email) {
    const jaExisteCache = cache.get(email);

    if (jaExisteCache == undefined) {
        cache.set(email, 1, 30);

        return;
    }
    if (cache.get(email) > 2) {
        throw new Error("Você atingiu o limite máximo de tentativas");
    }
    const tentativas = cache.get(email) + 1;
    cache.set(email, tentativas, 30);
}

const cacheLogin = new NodeCache();
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
                tentativasLogin(cacheLogin, email);
                await verificaSenha(senha, usuario.senha);
                done(null, usuario);
            } catch (error) {
                done(error);
            }
        }
    )
);

module.exports = passport;

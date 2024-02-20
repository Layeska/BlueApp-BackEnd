import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { jwt } from "../utils/jwt.js"

function register(req, res) {
    console.log(req.body);
    const { email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new User({
        email: email.toLowerCase(),
        password: hashPassword
    });

    user.save()
        .then((element) => res.status(201).send({ msg: "Usuario registrado exitosamente", user: element}))
        .catch(e => res.status(400).send({ msg: "Error al registrar el correo" }));
}

function login(req, res) {
    const { email, password } = req.body;

    const emailLowerCase = email.toLowerCase();

    User.findOne({ email: emailLowerCase })
        .then(userStore => {
            if (!userStore) {
                return res.status(404).send({ msg: "Usuario no encontrado" });
            }

            bcrypt.compare(password, userStore.password)
                .then(check => {
                    if (!check) return res.status(400).send({ msg: "Contraseña incorrecta", error: check });

                    res.status(200).send({
                        access: jwt.createAccessToket(userStore),
                        refresh: jwt.createRefreshToken(userStore)
                    });
                })
                .catch(bcryptError => res.status(500).send({ msg: "Error del servidor", error: bcryptError }));
        }).catch(error => res.status(500).send({ msg: "Error del servidor", error: error }));
}

export const AuthController = {
    register, login
};

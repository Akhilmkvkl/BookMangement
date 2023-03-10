const Books = require("../data/Books");
const Users = require("../data/Users");
const jwt = require("jsonwebtoken");

const userCtrl = {
    login: async (req, res) => {
        try {
            const result = await Users.some(
                (user) =>
                    user.username === req.body.username &&
                    user.password === req.body.password
            );
            if (result == true) {
                const userdata = await Users.find(
                    (user) =>
                        user.username === req.body.username &&
                        user.password === req.body.password
                );
                if (userdata) {
                    const payload = { id: userdata.id };
                    const token = await jwt.sign(payload, "secret123");
                    console.log(token);
                    res.send({ msg: "success", token });
                }
            } else {
                res.status(400).send({ msg: "invalid username/password" });
            }
        } catch (error) {
            console.log(error);
            res.status(400).send({ msg: "an error occured" });
        }
    },

    getbooks: async (req, res) => {
        try {
            console.log("this is the first data ");
            console.log(Books);

            res.send({ msg: "success", Books });
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = userCtrl;

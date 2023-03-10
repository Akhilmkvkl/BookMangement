const Books = require("../data/Books");

const adminCtrl = {

    addbook: async (req, res) => {

        try {
            console.log(req.body)
            const newData = req.body.newBookdata
            const result = await Books.some(
                (Book) =>
                    Book.title === newData.title
            );
            if (!result == true) {
                Books.push(req.body.newBookdata)
                res.send({ msg: "success" })
            } else {

                res.status(400).send({ msg: "This book is already exists" })
            }




        } catch (error) {
            res.status(400).send({ msg: "An error occured" })
        }
    },
    deleteBook: async (req, res) => {

        try {
            const Bookname = req.body.Bookname

            console.log(Bookname)
            for (let i = 0; i < Books.length; i++) {
                if (Books[i].title === Bookname) {
                    Books.splice(i, 1);
                    break;
                }
            }

            res.send({ msg: "success" })


        } catch (error) {
            res.status(400).send({ msg: "an error occured" })
        }
    }
}

module.exports = adminCtrl
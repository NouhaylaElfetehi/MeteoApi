const db = require("../models");
const Credit = db.credit;
const User = db.user;

exports.updateCredit = async (id) => {
    // console.log('test id ----------------------- test id', id);
    // user = await User.findByPk(id);
    // console.log('test ----------------------- test ', user);
    // console.log('credit ----------------------- credit ', credit);
    // Credit.findOne({id: credit.id}, (err, doc) => {
    //     doc.solde = credit.solde - 1;
    //     doc.save(callback);
    // });
    //
    // Credit.update(
    //     { solde: solde-- },
    //     { where: { userId: user.id } }
    // )
    User.findOne({
        where: {
            id: id
        }
    }).then((myUser) => {
        myUser.getCredit().then((credit) => {
            creditt = Credit.update(
                { solde: credit.solde-1 },
                { where: { userId: myUser.id } }
            )
        });
    });
}

// exports.getCredit = async (id) => {
//     let solde = 0;
//     User.findOne({
//         where: {
//             id: id
//         }
//     }).then((myUser) => {
//         myUser.getCredit().then((credit) => solde = credit.solde);
//     });
//     return solde;
// }
exports.getCredit = async function (id) {
    const credit = await Credit.findOne({where: {userId: id}});
    if (credit === null) {
        return 0;
    } else {
        return credit.solde
    }
}

// // FETCH all Customers include Addresses
// exports.getCredit = (req, res) => {
//     const id = Number(req.params.creditID)
//     const credit = Credit.find(credit => credit.id === id)
//
//     if (!credit) {
//         return res.status(404).send('Credit not found')
//     }
//     res.json(credit)
// };
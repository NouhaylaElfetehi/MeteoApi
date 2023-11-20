module.exports = (sequelize, Sequelize) => {
    const Credit = sequelize.define("credits", {
        solde: {
            type: Sequelize.FLOAT
        }
    });

    return Credit;
};
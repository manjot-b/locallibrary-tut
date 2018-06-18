module.exports = (sequelize, DataTypes) => {
    return sequelize.define('genre', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        name : {
            type: DataTypes.STRING,
            allowNull : false,
        },

        url : {
            type: DataTypes.VIRTUAL,
            get: function() {
                return '/catalog/genre/' + this.getDataValue('id');
            }
        }
    },
    {
        timestamps: false
    })
}
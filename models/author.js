module.exports = (sequelize, DataTypes) => {
    return sequelize.define('author', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        first_name : {
            type: DataTypes.STRING(100),
            allowNull : false,
        },

        family_name : {
            type: DataTypes.STRING(100),
            allowNull : false,
        },

        data_of_birth: DataTypes.DATE,
        date_of_death: DataTypes.DATE,

        name : {
            type: DataTypes.VIRTUAL,
            get: function() {
                return this.getDataValue('family_name') + 
                    ', ' + this.getDataValue('first_name');
            }
        },

        url : {
            type: DataTypes.VIRTUAL,
            get: function() {
                return '/catalog/author/' + this.getDataValue('id');
            }
        }
    },
    {
        timestamps: false
    })
}
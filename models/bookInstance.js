module.exports = (sequelize, DataTypes) => {
    return sequelize.define('book_instance', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        book_id : {
            type: DataTypes.INTEGER,
            references: {
                model: 'book',
                key: 'id'
            }
        },

        imprint : {
            type: DataTypes.STRING,
            allowNull : false,
        },

        status : {
            type: DataTypes.ENUM('Available', 'Maintenance', 'Loaned', 'Reserved'),
            defaultValue: 'Maintenance',
            allowNull: false,
        },

        due_back : {
            type: DataTypes.DATE,
            defaultValue : DataTypes.NOW,
        },

        url : {
            type: DataTypes.VIRTUAL,
            get: function() {
                return '/catalog/bookinstance/' + this.getDataValue('id');
            }
        }
    },
    {
        timestamps: false
    })
}
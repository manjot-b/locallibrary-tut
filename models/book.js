module.exports = (sequelize, DataTypes) => {
    return sequelize.define('book', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        title : {
            type: DataTypes.STRING,
            allowNull : false,
        },

        author_id : {
            type: DataTypes.INTEGER,
            references: {
                model: 'author',
                key: 'id'
            }
        },

        summary : {
            type: DataTypes.STRING,
            allowNull : false,
        },

        isbn : {
            type: DataTypes.STRING,
            allowNull : false,
        },
        
        /* 
        *   many-to-many relation
        *   deal with later
        genre : {
            type: DataTypes.STRING,
            allowNull : false,
        },
        */
        url : {
            type: DataTypes.VIRTUAL,
            get: function() {
                return '/catalog/book/' + this.getDataValue('id');
            }
        }
    },
    {
        timestamps: false
    })
}
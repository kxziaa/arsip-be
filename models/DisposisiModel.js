import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import SMasuk from "./SMasukModel.js";

const {DataTypes} = Sequelize;

const Disposisi = db.define('disposisi',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    tujuanDisp:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    catatan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Disposisi.belongsTo(SMasuk,{
    foreignKey: {
        name: 'SMasukId',
        allowNull: false,
    },
});

Users.hasMany(Disposisi);
Disposisi.belongsTo(Users, {foreignKey: 'userId'});



export default Disposisi;
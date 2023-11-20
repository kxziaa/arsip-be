import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const SMasuk = db.define('sMasuk',{
    noSM : DataTypes.STRING,
    asalSM : DataTypes.STRING,
    perihalSM : DataTypes.STRING,
    keteranganSM : DataTypes.STRING,
    tanggalSM : DataTypes.DATE,
    fileSM : DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default SMasuk;

(async()=>{
    await db.sync();
})();
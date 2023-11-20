import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const SKeluar = db.define('sKeluar',{
    noSK : DataTypes.STRING,
    tujuanSK : DataTypes.STRING,
    perihalSK : DataTypes.STRING,
    keteranganSK : DataTypes.STRING,
    tanggalSK : DataTypes.DATE,
    fileSK : DataTypes.STRING,
    urlSK: DataTypes.STRING
},{
    freezeTableName: true
});

export default SKeluar;

(async()=>{
    await db.sync();
})();
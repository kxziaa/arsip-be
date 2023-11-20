import Disposisi from "../models/DisposisiModel.js";
import path from "path";
import fs from "fs";
import Users from "../models/UserModel.js";
import SMasuk from "../models/SMasukModel.js"
import { Op } from "sequelize";

export const getDisposisi = async(req, res)=>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Disposisi.findAll({
                attributes:['uuid','tujuanDisp','catatan','SMasukId'],
                include:[{
                    model: Users,
                    attributes:['name','email','role']
                }]
            });
        }else{
            response = await Disposisi.findAll({
                attributes:['uuid','tujuanDisp','catatan','SMasukId'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: Users,
                    attributes:['name','email','role']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getDisposisiById = async(req, res)=>{
    // try {
    //     const response = await Disposisi.findOne({
    //         where:{
    //             id : req.params.id
    //         }
    //     });
    //     res.json(response);
    // } catch (error) {
    //     console.log(error.message);
    // }
    try {

        const disposisi = await Disposisi.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!disposisi) return res.status(404).json({msg: "Data Tidak Ditemukan"});

        let response;
        if(req.role === "admin"){
            response = await Disposisi.findOne({
                where:{
                    id: disposisi.id
                },
                attributes:['uuid','tujuanDisp','catatan','SMasukId'],
                include:[{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Disposisi.findOne({
                attributes:['uuid','tujuanDisp','catatan','SMasukId'],
                where:{
                    [Op.and]:[{id: disposisi.id},{userId: req.userId}]
                },
                include:[{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const saveDisposisi = async (req, res)=>{
    // const {tujuanDisp , catatan, sMasukId} = req.body;

    // try {
    //     const newTableDisposisi = await Disposisi.create({
    //         tujuanDisp,
    //         catatan,
    //         sMasukId: sMasukId,
    //     });
    //     res.json({message: "Data created successfully", data:newTableDisposisi})
    // } catch (error) {
    //     console.error('Error creating data', error);
    //     res.status(500).json({ error: 'Internal Server Error'})
    // }

    const tujuanDisp = req.body.tujuanDisp;
    const catatan = req.body.catatan;
    const SMasukId = req.body.SMasukId;

    try {
        await Disposisi.create({
            tujuanDisp : tujuanDisp,
            catatan : catatan,
            SMasukId : SMasukId,
            userId: req.userId
        });
        res.status(201).json({msg:"Data created"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteDisp = async(req, res) =>{
    try {
        const disposisi = await Disposisi.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!disposisi) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {tujuanDisp, catatan, SMasukId} = req.body;
        
        if(req.role === "admin"){
            await Disposisi.destroy({
                where:{
                    id: disposisi.id
                }
            });
        }else{
            if(req.userId !== disposisi.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Disposisi.destroy({
                where:{
                    [Op.and]:[{id: disposisi.id},{userId: req.userId}]
                },
            });
        }
        res.status(200).json({msg: "Disposisi Dihapus"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// export const getDispMasuk = async(req, res)=>{
//     const role = req.params.role

//     try {
//         const records = await Disposisi.findAll({
//             where: {
//                 tujuanDisp: role,
//             }
//         });
//         res.status(200).json(response);
//         }
//     catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

export const getDispMasuk = async(req, res)=>{

    const tujuanDisp = req.params.tujuanDisp
    try {
        let response;
        if(req.role === "kadis"){
            response = await Disposisi.findAll({
                where:{
                    tujuanDisp: "Kadis"
                },
                include:[{
                    model: Users,
                    attributes:['name','email','role']
                },
                {
                    model: SMasuk,
                    attributes:['url']
                }],

            });
        }
        else if(req.role === "kabidPIAK"){
            response = await Disposisi.findAll({
                where:{
                    tujuanDisp: "Kabid PIAK"
                }
            });
        }
        
        else if(req.role === "kabidPDIP"){
            response = await Disposisi.findAll({
                where:{
                    tujuanDisp: "Kabid PDIP"
                }
            });
        }
        else if(req.role === "kabidDafduk"){
            response = await Disposisi.findAll({
                where:{
                    tujuanDisp: "Kabid Dafduk"
                }
            });
        }

        else if(req.role === "kabidCapil"){
            response = await Disposisi.findAll({
                where:{
                    tujuanDisp: "Kabid Capil"
                }
            });
        }
        else{
            res.status(500).json({msg: error.message});
        }
        res.status(200).json(response);
    } catch (error) {
        
    }
}

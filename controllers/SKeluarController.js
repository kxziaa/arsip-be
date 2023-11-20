import SKeluar from "../models/SKeluarModel.js";
import path from "path";
import fs from "fs";

export const getSK = async(req, res)=>{
    try {
        const response = await SKeluar.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getSKById = async(req, res)=>{
    try {
        const response = await SKeluar.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveSK = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const noSK = req.body.noSK;
    const tujuanSK = req.body.tujuanSK;
    const perihalSK = req.body.perihalSK;
    const keteranganSK = req.body.keteranganSK;
    const tanggalSK =  req.body.tanggalSK; 
    const file = req.files.fileSK;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const urlSK = `${req.protocol}://${req.get("host")}/suratKeluar/${fileName}`;
    const allowedType = ['.pdf','.docx', '.doc'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid File"});
    if(fileSize > 5000000) return res.status(422).json({msg:"File must be less than 5MB"});
    
    file.mv(`./public/suratKeluar/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await SKeluar.create({
                noSK : noSK,
                tujuanSK : tujuanSK,
                perihalSK : perihalSK,
                keteranganSK : keteranganSK,
                tanggalSK : tanggalSK,
                fileSK : fileName,
                urlSK: urlSK
            });
            res.status(201).json({msg:"Data Created  Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateSK = async(req, res)=>{
    const sKeluar = await SKeluar.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!sKeluar) return res.status(404).json({msg: "No Data Found"});

    let fileName = "";
    if(req.files === null){
        fileName = sKeluar.fileSK;
    }else{
        const file = req.files.fileSK;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.pdf','.docx', '.doc'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid File"});
        if(fileSize > 5000000) return res.status(422).json({msg:"File must be less than 5MB"});

        const filepath = `./public/suratKeluar/${sKeluar.fileSK}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/suratKeluar/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const noSK = req.body.noSK;
    const tujuanSK = req.body.tujuanSK;
    const perihalSK = req.body.perihalSK;
    const keteranganSK = req.body.keteranganSK;
    const tanggalSK =  req.body.tanggalSK; 
    const urlSK = `${req.protocol}://${req.get("host")}/suratKeluar/${fileName}`;

    try {
        await SKeluar.update({
            noSK : noSK,
            tujuanSK : tujuanSK,
            perihalSK : perihalSK,
            keteranganSK : keteranganSK,
            tanggalSK : tanggalSK,
            fileSK : fileName,
            urlSK: urlSK
        },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Data Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
        
    }
}

export const deleteSK = async(req, res)=>{
    const sKeluar = await SKeluar.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!sKeluar) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/suratKeluar/${sKeluar.fileSK}`;
        fs.unlinkSync(filepath);
        await SKeluar.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Data Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const countRecordSK = (req, res) => {
    const query = 'SELECT COUNT(*) AS count FROM sKeluar';
  
    db.query(query, (err, results) => {
      if (err) {
        throw err;
      }
  
      res.json(results[0].count);
    });
  };
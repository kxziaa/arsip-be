import SMasuk from "../models/SMasukModel.js";
import path from "path";
import fs from "fs";

export const getSM = async(req, res)=>{
    try {
        const response = await SMasuk.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getSMById = async(req, res)=>{
    try {
        const response = await SMasuk.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveSM = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const noSM = req.body.noSM;
    const asalSM = req.body.asalSM;
    const perihalSM = req.body.perihalSM;
    const keteranganSM = req.body.keteranganSM;
    const tanggalSM =  req.body.tanggalSM; 
    const file = req.files.fileSM;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/suratMasuk/${fileName}`;
    const allowedType = ['.pdf','.docx', '.doc'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid File"});
    if(fileSize > 5000000) return res.status(422).json({msg:"File must be less than 5MB"});
    
    file.mv(`./public/suratMasuk/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await SMasuk.create({
                noSM : noSM,
                asalSM : asalSM,
                perihalSM : perihalSM,
                keteranganSM : keteranganSM,
                tanggalSM : tanggalSM,
                fileSM : fileName,
                url: url
            });
            res.status(201).json({msg:"Data Created  Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateSM = async(req, res)=>{
    const sMasuk = await SMasuk.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!sMasuk) return res.status(404).json({msg: "No Data Found"});

    let fileName = "";
    if(req.files === null){
        fileName = sMasuk.fileSM;
    }else{
        const file = req.files.fileSM;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.pdf','.docx', '.doc'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid File"});
        if(fileSize > 5000000) return res.status(422).json({msg:"File must be less than 5MB"});

        const filepath = `./public/suratMasuk/${sMasuk.fileSM}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/suratMasuk/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const noSM = req.body.noSM;
    const asalSM = req.body.asalSM;
    const perihalSM = req.body.perihalSM;
    const keteranganSM = req.body.keteranganSM;
    const tanggalSM =  req.body.tanggalSM; 
    const url = `${req.protocol}://${req.get("host")}/suratMasuk/${fileName}`;

    try {
        await SMasuk.update({
            noSM : noSM,
            asalSM : asalSM,
            perihalSM : perihalSM,
            keteranganSM : keteranganSM,
            tanggalSM : tanggalSM,
            fileSM : fileName,
            url: url
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

export const deleteSM = async(req, res)=>{
    const sMasuk = await SMasuk.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!sMasuk) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/suratMasuk/${sMasuk.fileSM}`;
        fs.unlinkSync(filepath);
        await SMasuk.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Data Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const getRecordSM = async (req, res) => {
    try {
      const [results] = await connection.execute('SELECT COUNT(*) AS count FROM sMasuk');
      res.json(results[0].count);
    } catch (error) {
      console.error('Error fetching record count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } 
  };
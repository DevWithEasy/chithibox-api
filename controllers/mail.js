const Mail = require("../models/mail")

exports.getAllMail=async(req,res,next) =>{
    try {
        const {id} = req.params
        const mails = await Mail.find({user : id})
        return res.status(200).json(mails)
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}

exports.getMail=async(req,res,next) =>{
    try {
        const {id} = req.query
        const newMail = new Mail({
            ...req.body,
            user : id
        })
        
        await newMail.save()
        
        return res.status(200).json({
            success : true,
            status: 200,
            message: "Successfully added mail",
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}

exports.updateMail=async(req,res,next) =>{
    try {
        const {id} = req.params
        const mail = await Mail.findByIdAndUpdate(id,{
            seen : true
        },{new : true})
        return res.status(200).json(mail)
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}
exports.sentMail=async(req,res,next) =>{
    try {
        const {id} = req.query
        const newMail = new Mail({
            ...req.body,
            user : id
        })
        
        await newMail.save()
        
        return res.status(200).json({
            success : true,
            status: 200,
            message: "Successfully added mail",
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}
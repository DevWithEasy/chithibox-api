const { default: User } = require("@model/user")

exports.signin=async(req,res,next) =>{
    try {
        const {username,password} = req.body
        
        const user = await User.findOne({username: username})
    
        if (!user) {
          return res.status(405).json({
            success: false,
            status: 405,
            message: 'Not Found any account.'
          })
        }
    
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    
        const isVerified = await bcrypt.compare(password, user.password)
    
        if (!isVerified) {
          return res.status(405).json({
            success: false,
            status: 405,
            message: 'Credentials wrong.'
          })
        }
        res.status(200).json({
          success: true,
          status: 200,
          message: 'Successfully signin.',
          token: token,
          data: user
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}
exports.signup=async(req,res,next) =>{
    try {
        console.log(req.body)
        const {username,password} = req.body

        //find exists userEmail
        const findUser = await User.findOne({username : username})
        
        if(findUser) return res.status(405).json({
                success : "failed",
                status:405,
                message:"User already exists"
        })
        
        // //generate hash password
        const hashed = await bcrypt.hash(password,10)

        // //create user
        const newUser = new User({
            ...req.body,
            password : hashed,
        })

        const user = await newUser.save()


        // //generate access token
        const token = await jwt.sign({id : user._id},process.env.JWT_SECRET)

        res.status(200).json({
            success : "success",
            status:200,
            message:"Successfully signup",
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}
exports.me=async(req,res,next) =>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}
exports.check=async(req,res,next) =>{
    try {
        const {q}=req.query
        const user = await User.findOne({username : q}).select('username')
        if(!user) return res.status(200).json({status: 'yes',user : {}})
        return res.status(200).json({status: 'no',user})
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}
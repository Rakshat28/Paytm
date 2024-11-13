const express = require('express');
const zod = require('zod');
const {User} = require("../db")
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config"); 
const router = express.Router();
const {authMiddleware} = require("../middleware");

const signupSchema = zod.object({
    username : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
});

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

const updateBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

router.post("/signup",async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return res.json({
            "message" : "Email already taken / Incorrect Input"
        })
    }

    const user = await User.findOne({
        username : body.username
    });
    if(user._id){
        return res.json({
            "message" : "user already exists"
        });
    }

    const dbUser = await User.create(body);
    const token = jwt.sign({
        userId : dbUser._id
    },JWT_SECRET);
    res.json({
        "message" : "User created successfully",
        token : token
    })
})


router.post("/signin",async(req,res)=>{
    const body = req.body;
    const {success} = signinBody.safeParse(body);
    if(!success){
        res.status(411).json({
            "message" : "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if(user){
       const token = jwt.sign({
        userId : user._id
       },JWT_SECRET);

       res.json({
        token : token
    })
    }
    res.status(411).json({
        "message" : "Error while loggin in "
    })

})

router.post("/",authMiddleware,async (req,res)=>{
    const body = req.body;
    const {success} = updateBody.safeParse(body);
    if(!success){
        return res.status(411).json({
            "message" : "Error while updating information"
        })
    }
    await User.updateOne({
        _id : req.userId
    },req.body);

    res.json({
        "message" : "Updated successfully"
    })
})

router.get("/bulk",async(req,res)=>{
    filter = req.query.filter || "";
    const users = await User.find({
        $or : [
            {
                firstName : { "$regex" : filter }
            },
            {
                lastName : { "$regex" : filter }
            }
        ]
    })
    res.json({
        user : users.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    });
})
module.exports= router;
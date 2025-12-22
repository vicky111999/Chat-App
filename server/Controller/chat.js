import chat from '../models/Message.js'

export const Allchats = async(req,res)=>{

    const {userId} = req.params
    const message = await chat.find({
        $or:[
            {
                sender:req.userId,
                receiver:userId
            },
            {
                sender:userId,
                receiver:req.userId
            }
        ]
    }).sort({createdAt: 1 })
   return res.json(message)
}

export const sendmsg=async(req,res)=>{

    const {userId} = req.params
    const {text} = req.body

    const message = new chat({
        sender:req.userId,
        receiver:userId,
        text
    })
    await message.save()
   return  res.json(message)
}
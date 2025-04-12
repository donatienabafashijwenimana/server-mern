import mongoose from 'mongoose'


const messageschema = mongoose.Schema(
    {  
       senderId :{
         type:mongoose.Schema.Types.ObjectId,
         ref:'user',
         required:true
       },
       receiverId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
      },
       text:{
        type:String,
      },
      images:{
        type:String,
      },
      statusread:{
        type:String,
        default :'unread'
      }
    },
    {
        timestamps:true,
    }
)

const messagemodel = mongoose.model('message',messageschema)
export default messagemodel

import mongoose from 'mongoose'

const friendshipSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  isread:{
    type: Boolean,
    default:false 
  }
}, { timestamps: true })

const Friendship = mongoose.model('Friendship', friendshipSchema)

export default Friendship

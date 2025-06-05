import { Schema, model } from 'mongoose'

const creditSchema = new Schema({
    userId: String,
    serverId: String,
    creditAmount: {
        type: Number,
        default: 0
    },
    lastMessage: Date,
    lastUpdate: Date,
    dailyBonus: Date
})

export default model('Credit', creditSchema)
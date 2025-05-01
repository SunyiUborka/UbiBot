import { Schema, model } from 'mongoose'

const warnSchema = new Schema({
    author: String,
    user: String,
    msg: String,
    date: { type: Date, default: Date.now()},
})

export default model('Warn', warnSchema)
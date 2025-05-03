import { Schema, model } from 'mongoose'

const reportSchema = new Schema({
    reportAuthor: String,
    reportServer: String,
    reportedUser: String,
    reportMessage: String,
    reportDate: { type: Date, default: Date.now()},
})

export default model('Report', reportSchema)
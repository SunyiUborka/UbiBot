import { Schema, model } from 'mongoose'

const reportSchema = new Schema({
    reportAuthor: String,
    reportServer: String,
    reportedUser: String,
    reportMessage: String,
    reportDate: Date,
})

export default model('Report', reportSchema)
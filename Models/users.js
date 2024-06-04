
import mongoose from "mongoose";
import links from './links.js'

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Ploni Almoni"
    },
    email: String,
    password: String,
    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: links
    }]

});
export default mongoose.model("users", UserSchema);

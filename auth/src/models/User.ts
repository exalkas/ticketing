import mongoose from 'mongoose'
import {Password } from '../services/password'

// interface for User model
interface UserAttrs {
    email: string;
    pass: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// Interface that describes the mongoose User
interface UserDoc extends mongoose.Document {
    email: string;
    pass: string;
}

const Schema  = mongoose.Schema

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    }
},
{
    toJSON: { // this is to convert the object to JSON and format it as needed. the .toObject() method with TS is difficul to use
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.pass;
            delete ret.__v;
        }
    }
})

// Create new User object keeping the types for typescript
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs)


userSchema.pre('save', async function(done) {

    if(this.isModified('pass')) {
        
        const hashed = await Password.hashPassword(this.get('pass'));

        this.set('pass', hashed)
    }

    done();
})

// userSchema.methods.formatUser = () => {

//     const user <User> = this;

//     return {
//         id: user._id,
//     }
// }

// model method accepts two generic types
// the first is the document type and the second is the model type
// the 2nd type is the one that is being returned
export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
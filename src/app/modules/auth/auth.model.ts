import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { IUser, IUserModel } from './auth.interface'
const authSchema = new Schema<IUser>(
  {
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['admin', 'user', 'superAdmin'],
      default: 'user',
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
)

authSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  )
  next()
})

const AuthModel = model<IUser, IUserModel>('auth', authSchema)

export default AuthModel

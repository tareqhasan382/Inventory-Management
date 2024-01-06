import { Model, Types } from 'mongoose'

export type IProduct = {
  userId: Types.ObjectId
  name: string
  category: string
  price: number
  image: string
  description: string
  size: string
  color: string
  quantity: number
}

export type IProductModel = Model<IProduct, Record<string, unknown>>

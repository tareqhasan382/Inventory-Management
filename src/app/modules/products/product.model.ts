import { Schema, model } from 'mongoose'
import { IProduct, IProductModel } from './product.interface'
const productSchema = new Schema<IProduct>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'auth' },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
)

const ProductModel = model<IProduct, IProductModel>('Products', productSchema)

export default ProductModel

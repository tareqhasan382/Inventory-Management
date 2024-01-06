import { IGenericResponse, UserId } from './../../../interface/common'
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IProduct } from './product.interface'
import ProductModel from './product.model'
import { SortOrder } from 'mongoose'

const createProduct = async (payload: IProduct): Promise<IProduct | null> => {
  console.log('Data service:', payload)
  const createdUser = await ProductModel.create(payload)
  // jodi user create na hoy
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Field to create Gellery!')
  }
  return createdUser
}
///auth/login

const getProduct = async (id: UserId): Promise<IProduct[] | null> => {
  // check exist
  console.log(id)
  const isUserExist = await ProductModel.find({ _id: id.id })

  return isUserExist
}
const getProducts = async (): Promise<IProduct[] | null> => {
  // check exist user
  // console.log('payload:', userId)
  const isUserExist = await ProductModel.find()

  return isUserExist
}
//getAllProducts ||
const getAllProducts = async (
  payload: any
): Promise<IGenericResponse<IProduct[]>> => {
  const { page, limit, search, filterField, sortOrder, sortField } = payload
  console.log('payload:', payload)
  const options = {
    page: parseInt(page as string),
    limit: parseInt(limit as string),
    // sort: sortOrder ? { [sortOrder as string]: 1 } : {},
    sort: sortOrder
      ? { [sortField as string]: parseInt(sortOrder as string) }
      : {},
  } as {
    page: number
    limit: number
    //sort: { [key: string]: SortOrder | { $meta: 'textScore' } }
    sort: { [key: string]: SortOrder }
  }

  const query: any = {}

  if (search) {
    query.category = { $regex: new RegExp(search as string, 'i') }
  }

  if (filterField) {
    query.category = filterField
    // Add more fields to filter as needed
  }

  const count = await ProductModel.countDocuments(query)
  const result = await ProductModel.find(query)
    .sort(options.sort)
    .skip((options.page - 1) * options.limit)
    .limit(options.limit)

  return {
    meta: {
      total: count,
      page: options.page,
      limit: options.limit,
    },
    data: result,
  }
}
const updateProduct = async (
  id: any,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  try {
    const updatedUser: any = await ProductModel.updateOne(
      { _id: id.id },
      payload,
      { new: true }
    )
    return updatedUser
  } catch (error) {
    console.error('Error updating user:', error)
    return null
  }
}
const deleteProduct = async (payload: string): Promise<IProduct | null> => {
  console.log('payload:', payload)
  try {
    const response: any = await ProductModel.deleteOne({ _id: payload })
    return response
  } catch (error) {
    console.error('Error delete user:', error)
    return null
  }
}
export const ProductService = {
  createProduct,
  getProduct,
  getAllProducts,
  getProducts,
  updateProduct,
  deleteProduct,
}

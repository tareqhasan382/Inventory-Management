/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Request, Response } from 'express'
import { ProductService } from './product.service'
import { IProduct } from './product.interface'

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  console.log('data:', data)
  const result = await ProductService.createProduct(data)

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' created successfully!',
    data: result,
  })
})

const getProduct = catchAsync(async (req: Request, res: Response) => {
  const id: any = req.params
  const result = await ProductService.getProduct(id)

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'data retrive in successfully!',
    data: result,
  })
})
const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  // const id: any = req.params
  // console.log('payload:', id)
  const result = await ProductService.getAllProducts(req.query)
  res.status(200).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data retrive successfully !!',
    //data: result,
    meta: result.meta,
    data: result.data,
  })
  // sendResponse<IProduct[]>(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'data retrive in successfully!',
  //   data: result,
  // })
})
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params
  const payload = req.body

  try {
    const updatedUser = await ProductService.updateProduct(id, payload)

    if (updatedUser) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User update in successfully!',
      })
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    console.error('Error in patchUser controller:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const data: any = req.params

  const result = await ProductService.deleteProduct(data?.id)

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'data deleted successfully!',
    data: result,
  })
})
export const ProductController = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
}

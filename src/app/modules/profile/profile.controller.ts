/* eslint-disable @typescript-eslint/no-explicit-any */

import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import AuthModel from '../auth/auth.model'
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const data: any = req.user
  const user = await AuthModel.findById({ _id: data?.userId })
  // console.log(user)
  return res.json({
    status: 'true',
    message: 'User retrive successfully!',
    data: user,
  })
})

///update
// const updateProfile = catchAsync(async (req: Request, res: Response) => {
//   //const user: any = req.user 65952af6ca23f583e83f161a
//   const id: any = req.params
//   const data: any = req.body
//   console.log('body:', data)
//   console.log('id:', id.id)
//   console.log('headers:', req.headers)
//   const result = await AuthModel.updateOne(
//     { _id: id.id },
//     { $set: data },
//     { new: true }
//   )
//   if (result?.acknowledged) {
//     res.json({ status: 'true', message: 'profile updated successfully' })
//   }
//   res.json({ status: 'false', message: 'profile updated Faield' })
//   // console.log('result:', result)
// })
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const id: any = req.params
  const data: any = req.body

  // y

  const result = await AuthModel.updateOne(
    { _id: id.id },
    { $set: data },
    { new: true }
  )

  if (result?.acknowledged) {
    res.json({ status: 'true', message: 'profile updated successfully' })
  } else {
    res.json({ status: 'false', message: 'profile updated Failed' })
  }
})

export const ProfileController = {
  getProfile,
  updateProfile,
}

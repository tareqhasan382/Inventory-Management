/* eslint-disable @typescript-eslint/no-explicit-any */

import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import AuthModel from '../auth/auth.model'
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const data: any = req.user
  const user = await AuthModel.findById({ _id: data?.userId })
  console.log(user)
  return res.json({
    status: 'true',
    message: 'User retrive successfully!',
    data: user,
  })
})
///admin/login
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user: any = req.user
  const data = req.body
  const result = await AuthModel.updateOne(
    { email: user?.email },
    { $set: data },
    { new: true }
  )
  if (result?.acknowledged) {
    res.json({ status: 'true', message: 'profile updated successfully' })
  }
  res.json({ status: 'false', message: 'profile updated Faield' })
  // console.log('result:', result)
})

export const ProfileController = {
  getProfile,
  updateProfile,
}

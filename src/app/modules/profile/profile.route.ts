import express from 'express'
import { ProfileController } from './profile.controller'
import { authVerify } from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enum/user'

const router = express.Router()

router.get(
  '/profile',
  authVerify(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  ProfileController.getProfile
)
router.patch('/editProfile', ProfileController.updateProfile)
export const ProfileRoute = router

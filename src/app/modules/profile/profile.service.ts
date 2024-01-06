// const updateUser = async (
//   id: any,
//   payload: Partial<IUser>
// ): Promise<IUser | null> => {
//   try {
//     const updatedUser: any = await UserModel.updateOne(
//       { _id: id.id },
//       payload,
//       { new: true }
//     )
//     return updatedUser
//   } catch (error) {
//     console.error('Error updating user:', error)
//     return null
//   }
// }

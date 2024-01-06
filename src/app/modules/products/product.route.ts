import express from 'express'
import { ProductController } from './product.controller'

const router = express.Router()
router.get('/product/:id', ProductController.getProduct),
  router.patch('/product/:id', ProductController.updateProduct),
  router.delete('/product/:id', ProductController.deleteProduct),
  router.get('/product', ProductController.getAllProduct),
  router.post('/addProduct', ProductController.createProduct)
export const ProductRoute = router

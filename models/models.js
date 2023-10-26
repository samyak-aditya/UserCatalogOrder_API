import mongoose from 'mongoose';
import { ulid } from 'ulid'
import { nanoid } from 'nanoid'

const userSchema = new mongoose.Schema({
 
  username: String,
  password: String,
  type: { type: String, enum: ['buyer', 'seller'] },
  
});


const productSchema = new mongoose.Schema({
 
  name: String,
  price: Number,
});


const catalogSchema = new mongoose.Schema({
 
  seller: { type: String, ref: 'User' },
  products: [{ type: String, ref: 'Product' }],
});

const orderSchema = new mongoose.Schema({
 
  buyer: { type: String, ref: 'User' },
  seller: { type: String, ref: 'User' },
  items: [
    {
      product: { type: String, ref: 'Product' },
      quantity: Number,
    },
  ],
  
});


const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Catalog = mongoose.model('Catalog', catalogSchema);
const Order = mongoose.model('Order', orderSchema);

export { User, Product, Catalog, Order };

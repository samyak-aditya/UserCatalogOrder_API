
import express from 'express';
import { User, Product, Catalog, Order } from '../models/models.js'; 

const getSellers = async (req, res) => {
  try {
    
    const sellers = await User.find({ type: 'seller' });

    
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sellers' });
  }
};

const getSellerCatalog = async (req, res) => {
  const sellerId = req.params.seller_id;

  try {
    // Find the catalog associated with the seller
    const catalog = await Catalog.findOne({ seller: sellerId }).populate('products');

    if (!catalog) {
      return res.status(404).json({ error: "Seller's catalog not found" });
    }

    res.status(200).json({ catalog });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve seller catalog' });
  }
};



const createOrder = async (req, res) => {
  const buyerId = req.decoded.userId; 
  const sellerId = req.params.seller_id;
  const items = req.body.items; 

  try {
  
    const buyer = await User.findById(buyerId);
    const seller = await User.findById(sellerId);

    if (!buyer || !seller) {
      return res.status(404).json({ error: 'Buyer or seller not found' });
    }

   
    const catalog = await Catalog.findOne({ seller: sellerId });

    if (!catalog) {
      return res.status(404).json({ error: "Seller's catalog not found" });
    }

    // Create the order
    const order = new Order({ buyer: buyerId, seller: sellerId, items });
    await order.save();

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Order creation failed' });
  }
};

export { getSellerCatalog, getSellers,  createOrder};



import express from 'express';
import { User, Product, Catalog, Order } from '../models/models.js'; 


const createCatalog = async (req, res) => {
  const { products } = req.body;
  const sellerId = req.decoded.userId; 
  try {
    
    const existingCatalog = await Catalog.findOne({ seller: sellerId });

    if (existingCatalog) {
      return res.status(400).json({ error: 'Seller already has a catalog' });
    }

    // Check if the 'products' array is empty
    if (!products || products.length === 0) {
      return res.status(400).json({ error: 'Catalog must have at least one product' });
    }

    const productIds = [];

    for (const productData of products) {
      const { name, price } = productData;
      const newProduct = new Product({ name, price });
      await newProduct.save();
      productIds.push(newProduct._id);
    }

    const seller = await User.findOne({ _id: sellerId, type: 'seller' });

    if (!seller) {
      return res.status(404).json({ error: 'Seller not found or is not a seller' });
    }

    const catalog = new Catalog({ seller: sellerId, products: productIds });
    await catalog.save();

    // Update the seller to reference the newly created catalog
    seller.catalog = catalog;
    await seller.save();

    // Send a success response
    res.status(201).json({ message: 'Catalog created successfully' });
  } catch (error) {
    console.error('Error creating catalog:', error); 
    res.status(400).json({ error: "Catalog creation failed" });
  }
};




const getOrders = async (req, res) => {
  const sellerId = req.decoded.userId; 

  try {
    
    const seller = await User.findOne({ _id: sellerId, type: 'seller' });

    if (!seller) {
      return res.status(404).json({ error: 'Seller not found or is not a seller' });
    }

    // Find all orders where the seller matches the sellerId
    const orders = await Order.find({ seller: sellerId });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

export { createCatalog, getOrders };



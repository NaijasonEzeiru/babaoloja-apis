import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { unlink } from 'fs';
import { promisify } from 'util';
import cloudinary from '../utils/cloudinary.js';
import { products } from '../db/schema/schema.js';
import { db } from '../db/db.js';

const unlinkAsync = promisify(unlink);

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await db.query.products.findMany();
    res.status(201).json(allProducts);

    console.log(allProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const addNewProduct = async (req: Request, res: Response) => {
  const {
    category,
    subCategory,
    state,
    city,
    dynamic,
    userName,
    desc,
    phone,
    price,
    negotiable,
    userId
  } = req.body;
  try {
    // console.log({ files: req.files });
    console.log({ body: req.body });
    // console.log(images[0]);
    if (
      !category ||
      !subCategory ||
      !state ||
      !city ||
      !dynamic ||
      !userName ||
      !desc ||
      !phone ||
      !price ||
      !negotiable ||
      !userId ||
      !req.files
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    let images = [];

    for (let i = 0; i < +req.files.length; i++) {
      // console.log({ path: req.files[i].path });
      const result = await cloudinary.uploader.upload(req.files[i].path, {
        upload_preset: 'ecomm'
      });
      await unlinkAsync(req.files[i].path);
      images.push(result.secure_url);
    }

    let [product] = await db
      .insert(products)
      .values({
        phone,
        city,
        category,
        state,
        subCategory,
        negotiable,
        userId,
        price: +price,
        specifications: dynamic,
        description: desc,
        cloudinary_ids: images
      })
      .returning();
    if (products) {
      return res.status(201).json({ message: product });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

// exports.updateProduct = async (req: Request, res: Response) => {
// 	try {
// 		await prisma.product.update({
// 			where: {
// 				id: req.body.id
// 			},
// 			data: {}
// 		});
// 	} catch (error) {
// 		res.status(500).json({ message: 'Internal server error' });
// 	}
// };

export const deleteProduct = async (req: Request, res: Response) => {
  console.log(req.body.id);
  try {
    const [product] = await db
      .delete(products)
      .where(eq(products.id, req.body.id))
      .returning();
    for (let i = 0; i < product.cloudinary_ids.length; i++) {
      await cloudinary.uploader.destroy('user.cloudinary_id{imageName}');
    }
    return res
      .status(200)
      .json({ message: 'The product has been deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  console.log('get-product');
  console.log(req.params.id);
  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, req.params.id));
    if (!product) {
      return res.status(400).json({ message: 'Product does not exist' });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error: ' + error?.message });
  }
};

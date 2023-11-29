import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { categories, products } from '../db/schema/schema.js';
import { db } from '../db/db.js';

export const addNewCategory = async (req: Request, res: Response) => {
  try {
    const cat = await db
      .insert(categories)
      .values({
        name: req.body.name
      })
      .returning();
    res.status(201).json({ message: cat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
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

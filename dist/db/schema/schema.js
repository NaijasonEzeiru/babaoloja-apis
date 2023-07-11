import { relations } from 'drizzle-orm';
import { pgTable, text, varchar, timestamp, uuid, integer, json
// primaryKey,
 } from 'drizzle-orm/pg-core';
export var users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', { length: 120 }).notNull(),
    lastName: varchar('last_name', { length: 120 }).notNull(),
    passwordHash: varchar('password_hash', { length: 120 }).notNull(),
    email: varchar('email', { length: 120 }).notNull(),
    role: text('role', { enum: ['admin', 'user', 'moderator'] })
        .default('user')
        .notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});
export var userRelations = relations(users, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        userAddress: one(userAddress, {
            fields: [users.id],
            references: [userAddress.id]
        }),
        products: many(products),
        payments: many(payments)
    });
});
export var userAddress = pgTable('user_address', {
    id: uuid('id').primaryKey().defaultRandom(),
    phone: varchar('phone', { length: 120 }),
    address: varchar('address', { length: 120 }),
    country: varchar('country', { length: 120 }),
    city: varchar('city', { length: 120 }),
    postalCode: varchar('postal_code', { length: 120 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
    // userId: integer('user_id').references(() => users.id, {
    // 	onDelete: 'cascade'
    // })
});
//   user_id     Int    @unique
//   user        User   @relation(fields: [user_id], references: [id])
// }
export var products = pgTable('products', {
    id: uuid('id').primaryKey().defaultRandom(),
    price: integer('price').notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    cloudinary_ids: varchar('cloudinary_ids', { length: 120 })
        .array()
        .notNull()
        .$type(),
    specifications: json('specifications').notNull(),
    userId: uuid('user_id'),
    // .references(() => users.id)
    // .notNull(),
    category: varchar('category', { length: 20 }).references(function () { return categories.name; }),
    phone: varchar('phone', { length: 20 }).notNull(),
    subCategory: varchar('sub_category', { length: 20 }).notNull(),
    state: varchar('state', { length: 20 }).notNull(),
    city: varchar('city', { length: 20 }).notNull(),
    // condition: varchar('condition', { length: 20 }).notNull(),
    negotiable: varchar('negotiable', { length: 10 }).notNull()
});
export var productsRelations = relations(products, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [products.userId],
            references: [users.id]
        }),
        products: one(categories, {
            fields: [products.category],
            references: [categories.name]
        })
    });
});
//   orders         Order_details[]
//   gender         String
//   colors         Json
//   sizes          String[]
// }
export var payments = pgTable('payments', {
    id: uuid('id').primaryKey().defaultRandom(),
    amount: integer('amount').notNull(),
    provider: varchar('provider', { length: 40 }).notNull(),
    status: text('status', {
        enum: ['completed', 'pending', 'unpaid', 'dispute']
    })
        .default('pending')
        .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    specifications: json('specifications'),
    userId: uuid('user_id').references(function () { return users.id; })
});
export var paymentsRelations = relations(payments, function (_a) {
    var one = _a.one;
    return ({
        user: one(users, {
            fields: [payments.userId],
            references: [users.id]
        })
    });
});
//   order     Order_details? @relation(fields: [order_id], references: [id])
//   order_id  Int            @unique
// }
export var categories = pgTable('categories', {
    name: varchar('name', { length: 20 }).primaryKey()
    // productId: varchar('product_id', { length: 30 }).references(
    // 	() => products.id
    // )
});
export var categoriesRelations = relations(categories, function (_a) {
    var many = _a.many;
    return ({
        products: many(products)
    });
});
//# sourceMappingURL=schema.js.map
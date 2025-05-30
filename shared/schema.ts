import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("user"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull(), // 'completed', 'pending', 'failed'
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const dashboardStats = pgTable("dashboard_stats", {
  id: serial("id").primaryKey(),
  totalSales: decimal("total_sales", { precision: 12, scale: 2 }).notNull(),
  activeUsers: integer("active_users").notNull(),
  totalOrders: integer("total_orders").notNull(),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }).notNull(),
  salesChange: decimal("sales_change", { precision: 5, scale: 2 }),
  usersChange: decimal("users_change", { precision: 5, scale: 2 }),
  ordersChange: decimal("orders_change", { precision: 5, scale: 2 }),
  conversionChange: decimal("conversion_change", { precision: 5, scale: 2 }),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const revenueData = pgTable("revenue_data", {
  id: serial("id").primaryKey(),
  day: text("day").notNull(),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).notNull(),
  date: timestamp("date").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertDashboardStatsSchema = createInsertSchema(dashboardStats).omit({
  id: true,
  updatedAt: true,
});

export const insertRevenueDataSchema = createInsertSchema(revenueData).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertDashboardStats = z.infer<typeof insertDashboardStatsSchema>;
export type DashboardStats = typeof dashboardStats.$inferSelect;
export type InsertRevenueData = z.infer<typeof insertRevenueDataSchema>;
export type RevenueData = typeof revenueData.$inferSelect;

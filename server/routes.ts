import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDashboardStatsSchema, insertRevenueDataSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard Stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats || {
        totalSales: "0.00",
        activeUsers: 0,
        totalOrders: 0,
        conversionRate: "0.00",
        salesChange: "0.00",
        usersChange: "0.00",
        ordersChange: "0.00",
        conversionChange: "0.00"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  app.post("/api/dashboard/stats", async (req, res) => {
    try {
      const validatedData = insertDashboardStatsSchema.parse(req.body);
      const stats = await storage.updateDashboardStats(validatedData);
      res.json(stats);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update dashboard stats" });
      }
    }
  });

  // Revenue Data
  app.get("/api/dashboard/revenue", async (req, res) => {
    try {
      const revenueData = await storage.getRevenueData();
      res.json(revenueData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch revenue data" });
    }
  });

  app.post("/api/dashboard/revenue", async (req, res) => {
    try {
      const validatedData = insertRevenueDataSchema.parse(req.body);
      const revenueData = await storage.createRevenueData(validatedData);
      res.json(revenueData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create revenue data" });
      }
    }
  });

  // Transactions
  app.get("/api/transactions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const transactions = await storage.getTransactions(limit);
      
      // Enhance with user data
      const enhancedTransactions = await Promise.all(
        transactions.map(async (transaction) => {
          const user = transaction.userId ? await storage.getUser(transaction.userId) : null;
          return {
            ...transaction,
            customer: user ? {
              name: user.name,
              email: user.email,
              avatar: user.avatar
            } : null
          };
        })
      );
      
      res.json(enhancedTransactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // External API Proxy Routes
  app.get("/api/external/dashboard/stats", async (req, res) => {
    try {
      // Add timestamp to prevent caching
      const timestamp = Date.now();
      const response = await fetch(`https://digiplus.pdwteam.com/api/dashboard/stats?_t=${timestamp}`, {
        headers: {
          'X-API-KEY': process.env.X_API_KEY || 'yourGeneratedSecureApiKey123abcXYZ',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('External API error:', error);
      res.status(500).json({ message: "Failed to fetch dashboard stats from external API" });
    }
  });

  app.get("/api/external/dashboard/sales-trend", async (req, res) => {
    try {
      const queryParams = new URLSearchParams({
        granularity: 'daily',
        metric: 'revenue',
        period: 'last30days',
        _t: Date.now().toString() // Add timestamp
      });
      
      const response = await fetch(`https://digiplus.pdwteam.com/api/dashboard/sales-trend?${queryParams}`, {
        headers: {
          'X-API-KEY': process.env.X_API_KEY || 'yourGeneratedSecureApiKey123abcXYZ',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('External API error:', error);
      res.status(500).json({ message: "Failed to fetch sales trend from external API" });
    }
  });

  app.get("/api/external/dashboard/top-products", async (req, res) => {
    try {
      const queryParams = new URLSearchParams({
        limit: '5',
        orderBy: 'revenue',
        _t: Date.now().toString() // Add timestamp
      });
      
      const response = await fetch(`https://digiplus.pdwteam.com/api/dashboard/top-products?${queryParams}`, {
        headers: {
          'X-API-KEY': process.env.X_API_KEY || 'yourGeneratedSecureApiKey123abcXYZ',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('External API error:', error);
      res.status(500).json({ message: "Failed to fetch top products from external API" });
    }
  });

  app.get("/api/external/dashboard/recent-transactions", async (req, res) => {
    try {
      // Add timestamp to prevent caching
      const timestamp = Date.now();
      const response = await fetch(`https://digiplus.pdwteam.com/api/dashboard/recent-transactions?_t=${timestamp}`, {
        headers: {
          'X-API-KEY': process.env.X_API_KEY || 'yourGeneratedSecureApiKey123abcXYZ',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('External API error:', error);
      res.status(500).json({ message: "Failed to fetch recent transactions from external API" });
    }
  });

  // Current User (for demo purposes)
  app.get("/api/user/current", async (req, res) => {
    try {
      // For demo, return a static user
      res.json({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Administrator",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch current user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

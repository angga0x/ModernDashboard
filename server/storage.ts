import { 
  users, 
  transactions, 
  dashboardStats, 
  revenueData,
  type User, 
  type InsertUser,
  type Transaction,
  type InsertTransaction,
  type DashboardStats,
  type InsertDashboardStats,
  type RevenueData,
  type InsertRevenueData
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Transactions
  getTransactions(limit?: number): Promise<Transaction[]>;
  getTransactionsByUser(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Dashboard Stats
  getDashboardStats(): Promise<DashboardStats | undefined>;
  updateDashboardStats(stats: InsertDashboardStats): Promise<DashboardStats>;
  
  // Revenue Data
  getRevenueData(): Promise<RevenueData[]>;
  createRevenueData(data: InsertRevenueData): Promise<RevenueData>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transactions: Map<number, Transaction>;
  private dashboardStatsData: DashboardStats | null;
  private revenueDataList: Map<number, RevenueData>;
  private currentUserId: number;
  private currentTransactionId: number;
  private currentRevenueId: number;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.dashboardStatsData = null;
    this.revenueDataList = new Map();
    this.currentUserId = 1;
    this.currentTransactionId = 1;
    this.currentRevenueId = 1;
    
    // Initialize with some sample data structure (empty)
    this.initializeEmptyData();
  }

  private initializeEmptyData() {
    // Initialize empty dashboard stats
    this.dashboardStatsData = {
      id: 1,
      totalSales: "0.00",
      activeUsers: 0,
      totalOrders: 0,
      conversionRate: "0.00",
      salesChange: "0.00",
      usersChange: "0.00",
      ordersChange: "0.00",
      conversionChange: "0.00",
      updatedAt: new Date()
    };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getTransactions(limit: number = 10): Promise<Transaction[]> {
    const transactions = Array.from(this.transactions.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
    return transactions;
  }

  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (transaction) => transaction.userId === userId,
    );
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      createdAt: new Date()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getDashboardStats(): Promise<DashboardStats | undefined> {
    return this.dashboardStatsData || undefined;
  }

  async updateDashboardStats(stats: InsertDashboardStats): Promise<DashboardStats> {
    this.dashboardStatsData = {
      id: 1,
      ...stats,
      updatedAt: new Date()
    };
    return this.dashboardStatsData;
  }

  async getRevenueData(): Promise<RevenueData[]> {
    return Array.from(this.revenueDataList.values())
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async createRevenueData(data: InsertRevenueData): Promise<RevenueData> {
    const id = this.currentRevenueId++;
    const revenueData: RevenueData = {
      ...data,
      id
    };
    this.revenueDataList.set(id, revenueData);
    return revenueData;
  }
}

export const storage = new MemStorage();

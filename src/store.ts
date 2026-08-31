import { create } from 'zustand';

export type ModuleName = 'Checkout Copilot' | 'Risk Sentinel' | 'Recovery Agent' | 'Finance Reconciler';
export type TransactionStatus = 'success' | 'failed' | 'pending' | 'refunded';
export type PaymentMethod = 'UPI' | 'Card' | 'Netbanking';

export interface DecisionLog {
  id: string;
  timestamp: string;
  module: ModuleName;
  input_summary: string;
  reasoning: string;
  action_taken: string;
  confidence_score: number;
  outcome: string;
  was_exception: boolean;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: TransactionStatus;
  timestamp: string;
  customer: string;
  cardOrUpi: string;
  device: string;
  city: string;
  billingMatch: boolean;
  isFraud: boolean;
}

export interface SettlementRecord {
  settlementId: string;
  orderId: string;
  amount: number;
  date: string;
  utr: string;
}

const names = ['Aarav Mehta', 'Isha Shah', 'Rohan Nair', 'Nisha Kapoor', 'Kabir Rao', 'Diya Iyer', 'Arjun Singh', 'Meera Joshi', 'Vivaan Das', 'Anaya Bose'];
const cities = ['Mumbai', 'Bengaluru', 'Delhi', 'Pune', 'Hyderabad', 'Chennai'];
const methods: PaymentMethod[] = ['UPI', 'Card', 'Netbanking'];
const statuses: TransactionStatus[] = ['success', 'success', 'success', 'failed', 'pending', 'refunded'];

function seedTransactions(): Transaction[] {
  return Array.from({ length: 72 }, (_, index) => {
    const amount = [799, 1299, 1899, 2499, 3499, 4599, 6999, 9999][index % 8] + (index % 4) * 100;
    const isFraud = [7, 8, 19, 20, 21, 43, 44, 61, 62, 63, 70].includes(index);
    const status = isFraud && index % 2 === 0 ? 'failed' : statuses[index % statuses.length];
    const date = new Date(Date.now() - ((index % 7) * 24 + (index % 11)) * 60 * 60 * 1000 - index * 8 * 60 * 1000);
    return {
      id: `txn_${String(index + 1).padStart(4, '0')}`,
      orderId: `order_${String(8400 + index)}`,
      amount,
      method: methods[index % methods.length],
      status,
      timestamp: date.toISOString(),
      customer: names[index % names.length],
      cardOrUpi: isFraud ? 'ring_' + (index % 3) : `${methods[index % methods.length].toLowerCase()}_${index % 17}`,
      device: isFraud ? 'new_device' : `device_${index % 12}`,
      city: isFraud ? cities[(index + 2) % cities.length] : cities[index % cities.length],
      billingMatch: !isFraud && index % 9 !== 0,
      isFraud,
    };
  });
}

function seedSettlements(transactions: Transaction[]): SettlementRecord[] {
  return transactions.slice(0, 63).map((transaction, index) => ({
    settlementId: `setl_${String(index + 1).padStart(4, '0')}`,
    orderId: index % 11 === 0 ? `order_missing_${index}` : transaction.orderId,
    amount: index % 8 === 0 ? transaction.amount - 2 : transaction.amount,
    date: new Date(new Date(transaction.timestamp).getTime() + (index % 6 === 0 ? 2 : 0) * 86400000).toISOString(),
    utr: `UTR${String(120000000 + index)}`,
  }));
}

const seededTransactions = seedTransactions();

interface CopilotState {
  logs: DecisionLog[];
  transactions: Transaction[];
  settlements: SettlementRecord[];
  recoveryRecovered: number;
  checkoutUpsellRevenue: number;
  reconciliationAccuracy: number;
  addLog: (entry: Omit<DecisionLog, 'id' | 'timestamp'>) => void;
  setRecoveryRecovered: (amount: number) => void;
  setCheckoutUpsellRevenue: (amount: number) => void;
  setReconciliationAccuracy: (value: number) => void;
}

const initialLogs: DecisionLog[] = seededTransactions.slice(0, 8).map((transaction, index) => ({
  id: `seed_log_${index}`,
  timestamp: transaction.timestamp,
  module: index % 2 ? 'Risk Sentinel' : 'Checkout Copilot',
  input_summary: `${transaction.orderId} · ₹${transaction.amount.toLocaleString('en-IN')}`,
  reasoning: index % 2 ? 'Checked velocity, amount anomaly, and device consistency.' : 'Catalog match confirmed; payment path is bounded by explicit confirmation.',
  action_taken: index % 2 ? 'Risk score recorded' : 'Order created in test mode',
  confidence_score: index % 2 ? 88 : 96,
  outcome: index % 2 ? 'Low risk · allowed' : 'Awaiting customer confirmation',
  was_exception: false,
}));

export const useCopilotStore = create<CopilotState>((set) => ({
  logs: initialLogs,
  transactions: seededTransactions,
  settlements: seedSettlements(seededTransactions),
  recoveryRecovered: 0,
  checkoutUpsellRevenue: 0,
  reconciliationAccuracy: 0,
  addLog: (entry) => set((state) => ({ logs: [{ ...entry, id: `log_${Date.now()}_${Math.random().toString(16).slice(2)}`, timestamp: new Date().toISOString() }, ...state.logs] })),
  setRecoveryRecovered: (amount) => set({ recoveryRecovered: amount }),
  setCheckoutUpsellRevenue: (amount) => set({ checkoutUpsellRevenue: amount }),
  setReconciliationAccuracy: (value) => set({ reconciliationAccuracy: value }),
}));

export function formatINR(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

export function formatTime(timestamp: string): string {
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(timestamp));
}

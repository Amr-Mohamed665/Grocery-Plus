export type TransactionStatus = "Completed" | "Pending" | "Failed";

export interface Transaction {
  id: string;
  orderNumber: string;
  date: string;
  amount: number;
  currencySymbol: string;
  status: TransactionStatus;
  isRefund: boolean;
}

const paymentHistoryData: Transaction[] = [
  {
    id: "tx-001",
    orderNumber: "GP001",
    date: "Nov 24, 2025",
    amount: 45.32,
    currencySymbol: "£",
    status: "Completed",
    isRefund: false,
  },
  {
    id: "tx-002",
    orderNumber: "GP001",
    date: "Nov 20, 2025",
    amount: 45.32,
    currencySymbol: "£",
    status: "Completed",
    isRefund: true,
  },
  {
    id: "tx-003",
    orderNumber: "GP002",
    date: "Nov 18, 2025",
    amount: 67.89,
    currencySymbol: "£",
    status: "Completed",
    isRefund: false,
  },
];

export default paymentHistoryData;

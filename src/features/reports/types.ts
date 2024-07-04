interface SalesData {
  label: string;
  amount: number;
}

interface BidsCount {
  label: string;
  count: number;
}

interface SalesPerformanceReport {
  period: string;
  total_sales: number;
  sales_data: SalesData[];
  published_products: number;
  sold_products: number;
  all_published_products: number;
  all_sold_products: number;
}

interface BidsPerformanceReport {
  period: string;
  bids_count: BidsCount[];
  published_bids: number;
  accepted_bids: number;
  all_published_bids: number;
  all_accepted_bids: number;
}

export interface ReportsState {
  salesPerformance: SalesPerformanceReport | null;
  bidsPerformance: BidsPerformanceReport | null;
  loading: boolean;
  error: {detail: string} | null;
}
export interface DashboardData {
  overview?: {
    current_cart?: {
      items_count?: number;
      last_updated?: string;
      total?: number;
    };
    upcoming_delivery?: {
      items_count?: number;
      from?: string;
      to?: string;
      code?: string;
    };
  };
  recent_orders?: any[];
  top_purchases?: any[];
  category_distribution?: any[];
  [key: string]: any;
}

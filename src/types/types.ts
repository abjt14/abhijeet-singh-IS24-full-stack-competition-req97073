// defines the product type
export interface Product {
  productId: string;
  productName: string;
  productOwnerName: string;
  developers: string[];
  scrumMasterName: string;
  startDate: string;
  methodology: "Agile" | "Waterfall";
}

// desfines the product type as it is returned from the API
export interface APIProduct extends Product {
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

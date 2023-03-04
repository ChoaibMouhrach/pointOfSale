export type Settings = {
  currency: string;
  company_name: string;
  vat: string;
};

export type UpdateSettings = {
  currency?: string;
  company_name?: string;
  vat?: string;
};

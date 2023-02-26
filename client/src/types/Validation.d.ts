export type ValidationError = {
  message?: string;
  errors?: {
    [error: string]: string[];
  };
};

export type ActiveColumn = {
  name: string | null;
  direction: "asc" | "desc";
};

export type Headers = {
  sort: boolean;
  name: string;
}[];

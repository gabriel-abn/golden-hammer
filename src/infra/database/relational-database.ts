export interface RelationalDatabase {
  query: (query: string) => Promise<any>;
}

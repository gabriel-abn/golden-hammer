export interface RelationalDatabase {
  query: (query: string) => Promise<any>;
  execute: (query: string) => Promise<any>;
}

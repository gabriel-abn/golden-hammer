import { Maintence } from "@domain/Maintence";

export interface IMaintenceRepository {
  getByID(id: string): Promise<Maintence>;
  create(maintence: Maintence): Promise<string>;
  getAll(): Promise<Maintence[]>;
}

import { Maintence, MaintenceProps } from "@domain/Maintence";

export interface IMaintenceRepository {
  getByID(id: string): Promise<MaintenceProps>;
  create(maintence: Maintence): Promise<string>;
  getAll(): Promise<MaintenceProps[]>;
  updateByID(maintence: Maintence): Promise<string>;
}

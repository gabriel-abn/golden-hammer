import { Maintence, MaintenceProps } from "@domain/Maintence";

export interface IMaintenceRepository {
  getByID(id: string): Promise<MaintenceProps>;
  create(maintence: Maintence): Promise<string>;
  getAll(): Promise<MaintenceProps[]>;
  update(maintence: Maintence): Promise<string>;
  delete(id: string): Promise<boolean>;
}

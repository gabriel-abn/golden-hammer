import { IMaintenceRepository } from "@application/repositories";
import { Maintence, MaintenceProps } from "@domain/Maintence";

export class MaintenceRepository implements IMaintenceRepository {
  async getByID(id: string): Promise<MaintenceProps> {
    throw new Error("Method not implemented.");
  }
  async create(maintence: Maintence): Promise<string> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<MaintenceProps[]> {
    throw new Error("Method not implemented.");
  }
  async update(maintence: Maintence): Promise<string> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

import { PrismaClient } from "../client";

export class BaseRepository<T> {
  protected prisma: PrismaClient;
  protected modelName: string;

  constructor(prisma: PrismaClient, modelName: string) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  protected get model(): any {
    return (this.prisma as any)[this.modelName];
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: any;
    orderBy?: any;
    include?: any;
  }): Promise<T[]> {
    const where = { ...params.where, deletedAt: null };
    return this.model.findMany({ ...params, where });
  }

  async findUnique(id: string, include?: any): Promise<T | null> {
    const record = await this.model.findUnique({
      where: { id },
      include,
    });
    if (record && (record as any).deletedAt !== null) {
      return null;
    }
    return record;
  }

  async create(data: any): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: string, data: any): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T> {
    return this.model.delete({
      where: { id },
    });
  }

  async softDelete(id: string): Promise<T> {
    return this.model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async count(where: any = {}): Promise<number> {
    const countWhere = { ...where, deletedAt: null };
    return this.model.count({ where: countWhere });
  }
}

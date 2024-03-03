import { PrismaClient } from "@prisma/client"
import DataLoader from "dataloader"

export type TContext = {
  db: PrismaClient,
  loaders: WeakMap<WeakKey, DataLoader<string, unknown>>
}
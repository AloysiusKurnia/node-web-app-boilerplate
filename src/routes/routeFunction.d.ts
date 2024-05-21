import { PrismaClient } from "@prisma/client";
import { Router } from "express";

type RouterFunction = (db: PrismaClient) => Router;
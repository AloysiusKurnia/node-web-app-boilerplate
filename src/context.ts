import { PrismaClient } from '@prisma/client';
import { Express } from 'express';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
export type Context = {
    run(app: Express): void;
    db: PrismaClient;
};

function initContext(): Context {
    if (process.env.NODE_ENV !== 'test') {
        return {
            run(app: Express) {
                const port = 3000;
                app.listen(port, () => {
                    console.log(`Example app listening on port ${port}`);
                });
            },

            db: new PrismaClient()
        };
    } else {
        return {
            run() {
                console.log("Running on test env!");
            },
            db: mockDeep<PrismaClient>()
        };
    }
}

export const context = initContext();
export const mockDb = context.db as unknown as DeepMockProxy<PrismaClient>;
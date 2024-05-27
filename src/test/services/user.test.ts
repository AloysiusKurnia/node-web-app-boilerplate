import { context, mockDb } from "../../context";
import userService, { AuthService } from "../../main/services/auth";

class NoErrorThrown extends Error { }
const getError = async <TError>(call: () => unknown): Promise<TError> => {
    try {
        await call();
        throw new NoErrorThrown();
    } catch (error: unknown) {
        return error as TError;
    }
};

describe('service for the users page', () => {
    let service: AuthService;

    beforeEach(() => {
        service = userService(context.db);
    });

    describe('register method', () => {
        const testUser = {
            name: 'Test User',
            handle: 'TestUser',
            email: 'nyom@test.com',
            password: 'nanana',
            passwordConfirm: 'nanana'
        };

        it('should call the database', async () => {
            mockDb.user.findMany.mockResolvedValue([]);
            await service.registerUser(testUser);

            expect(mockDb.user.create).toHaveBeenCalledTimes(1);
            const lastCall = mockDb.user.create.mock.calls[0];
            expect(lastCall.length).toBe(1);
            const lastCallData = lastCall[0].data;
            expect(lastCallData).toMatchObject({
                email: testUser.email,
                handle: testUser.handle,
                name: testUser.name
            });
        });

        // it('should throw if a field already exists', () => {
        //     mockDb.user.findUnique.mockImplementation((arg) => {
        //         arg.
        //     })
        // })
    });
});
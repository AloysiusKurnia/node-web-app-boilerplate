import supertest from "supertest";
import { mockDb } from "../context";
import { main } from '../main/app';

const req = supertest(main());

describe('index route', function () {
    it('should fetch from db', async function () {
        const user = [{
            id: 1,
            name: 'Wawa',
            email: 'wawa@wawa.wa',
        }];
        mockDb.user.findMany.mockResolvedValue(user);

        const res = await req.get('/users');

        expect(res.status).toBe(200);
        expect(res.type).toBe('text/html');
        expect(res.text).toContain('Wawa');
        expect(res.text).toContain('wawa@wawa.wa');
    });
});
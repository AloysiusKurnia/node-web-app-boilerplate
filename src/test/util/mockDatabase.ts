import { User } from "@prisma/client";

export const placeholderUsers: User[] = [
    {
        id: 0, email: 'user1@test.com', handle: 'CoolGuy1',
        name: 'Cool Guy!',
        salt: 'garam', password: 'assume-this-thing-is-hashed',
        createdAt: new Date('21 Feb 2021')
    },
    {
        id: 1, email: 'user2@test.com', handle: 'CoolGuy2',
        name: 'Cool Guy Too!',
        salt: 'garam', password: 'assume-this-thing-is-hashed',
        createdAt: new Date('1 Jan 2021')
    },
    {
        id: 2, email: 'user3@test.com', handle: 'UncoolGuy',
        name: '>:(',
        salt: 'garam', password: 'assume-this-thing-is-hashed',
        createdAt: new Date('4 Mar 2000')
    },
];
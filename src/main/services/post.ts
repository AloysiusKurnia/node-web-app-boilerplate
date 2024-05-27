import { PrismaClient } from "@prisma/client";
import { PostSummary } from "../types/post";

export interface PostService {
    addPost(args: {
        creatorHandle: string;
        title: string;
        content: string;
        published: boolean;
    }): Promise<{
        id: number;
    }>;

    getPostList(args: {
        page: number,
        postsPerPage: number;
    }): Promise<{
        totalPageCount: number;
        posts: PostSummary[];
    }>;

    getPost(args: {
        id: number;
    }): Promise<{
        title: string;
        creatorHandle: string;
        creatorName: string;
    }>;
}

export default function postService(_db: PrismaClient): PostService {
    return {
        addPost(_args) {
            throw new Error('Not implemented');
        },

        getPostList(_args) {
            throw new Error('Not implemented');
        },

        getPost(_args) {
            throw new Error('Not implemented');
        },
    };
}
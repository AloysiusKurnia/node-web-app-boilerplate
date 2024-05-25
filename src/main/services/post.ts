import { PrismaClient } from "@prisma/client";
import { PostSummary } from "../types/post";

export interface PostService {
    addPost(args: {
        creatorHandle: string;
        title: string;
        content: string;
        published: boolean;
    }): {
        id: number;
    };

    getPostList(args: {
        page: number,
        postsPerPage: number;
    }): {
        totalPageCount: number;
        posts: PostSummary[];
    };

    getPost(args: {
        id: number;
    }): {
        title: string;
        creatorHandle: string;
        creatorName: string;
    };
}

export default function postService(db: PrismaClient): PostService {
    throw new Error('Not implemented');
}
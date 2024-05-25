import { UserSummary } from "./user";

export type Post = {
    user: UserSummary;
    title: string;
    content: string;
};

export type PostSummary = {
    user: UserSummary;
    title: string;
    summary: string;
}
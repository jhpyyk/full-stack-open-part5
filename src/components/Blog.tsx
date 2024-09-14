import { BlogType } from "../types";

interface BlogProps {
    blog: BlogType;
}

const Blog = ({ blog }: BlogProps) => (
    <div>
        <i>{blog.title}</i> by <b>{blog.author}</b>
    </div>
);

export default Blog;

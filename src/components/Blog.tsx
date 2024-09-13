import { BlogType } from "../types"

interface BlogProps {
    blog: BlogType
}

const Blog = ({ blog }: BlogProps) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

export default Blog
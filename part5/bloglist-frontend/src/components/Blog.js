import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

    return (
        <Link to={`/blogs/${blog.id}`}><b>{blog.title}</b></Link>
    )
}

export default Blog
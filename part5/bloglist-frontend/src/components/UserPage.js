import { Link, useParams } from 'react-router-dom'
import Blog from './Blog'
import { ListGroup, Button } from 'react-bootstrap'

const UserPage = (props) => {
    const id = useParams().id
    if (!props.users[0]) {
        console.log('return null')
        return null
    }

    const user = props.users.find(user => user.id === id)
    return (
        <ListGroup>
            <ListGroup.Item disabled>{user.username}</ListGroup.Item>
            {user.blogs.map(blog => {
                return (
                    <ListGroup.Item>
                        <Blog key={blog.id} blog={blog} />
                    </ListGroup.Item>
                )
            })}
            <Link to='/'><Button variant="secondary">Go Back</Button></Link>
        </ListGroup>
    )
}

export default UserPage
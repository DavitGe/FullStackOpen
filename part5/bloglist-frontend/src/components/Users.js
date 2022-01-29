import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = (props) => {

    return (
        <Table>
            <thead>
                <tr>
                    <th>Users</th>
                    <th>Blogs count</th>
                </tr>
            </thead>
            <tbody>
                {props.users.map(user => {
                    if (user) {
                        return (
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr >
                        )
                    }
                })}
            </tbody>
        </Table>
    )
}

export default Users
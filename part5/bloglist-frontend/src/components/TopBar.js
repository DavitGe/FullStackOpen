import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, Button, Alert } from 'react-bootstrap'

const TopBar = (props) => {
    const linkStyles = {
        color: '#FFF',
        paddingRight: '14px',
        alignSelf: 'center'
    }
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Nav>
                        <Navbar.Brand href='/'>BlogList</Navbar.Brand>
                        <Link to='/' style={linkStyles}>Blogs</Link>
                        <Link to='/users' style={linkStyles}>Users</Link>
                    </Nav>
                    <Nav>
                        <Navbar.Text>{props.user.username} logged in</Navbar.Text>
                        <Button variant="outline-light" onClick={props.logOut} >Log Out</Button>
                    </Nav>
                </Container>
            </Navbar>
            {props.notification === ''
                ? null
                : <Alert className='notification'>{props.notification}</Alert>
            }
        </>
    )
}


export default TopBar
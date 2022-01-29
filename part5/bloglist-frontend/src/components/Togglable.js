import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'


const Togglable = (props) => {
    const showWhenVisible = { display: props.isVisible ? '' : 'none' }
    const hidenWhenVisible = { display: props.isVisible ? 'none' : '' }
    return (
        <>
            <Button style={hidenWhenVisible} onClick={() => { props.setIsVisible(true) }}>{props.buttonText}</Button>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant="danger" onClick={() => { props.setIsVisible(false) }}>Cancel</Button>
            </div>
        </>
    )
}

Togglable.propTypes = {
    buttonText: PropTypes.string.isRequired
}

export default Togglable
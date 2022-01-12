import React from 'react'
import PropTypes from 'prop-types'


const Togglable = (props) => {
  const showWhenVisible = { display: props.isVisible ? '' : 'none' }
  const hidenWhenVisible = { display: props.isVisible ? 'none' : '' }
  return (
    <>
      <button style={hidenWhenVisible} onClick={() => { props.setIsVisible(true) }}>{props.buttonText}</button>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => { props.setIsVisible(false) }}>Cancel</button>
      </div>
    </>
  )
}

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired
}

export default Togglable
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'


const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { marginTop: 100, display: visible ? '' : 'none', }

    const toggleVisibility = () => {
        setVisible(!visible)
    }


    return (
        <div>
            <div className='text-center' style={hideWhenVisible}>
                <Button variant="primary" onClick={toggleVisibility} style={{ position: 'absolute', top: '50%' }}>Register</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <div className='text-center'>
                    <Button variant="danger" onClick={toggleVisibility} style={{ marginTop: 5 }}>Close</Button>
                </div>
            </div>
        </div>
    )
}



export default Togglable
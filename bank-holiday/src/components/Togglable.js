import { useState } from 'react'
import { Button } from 'react-bootstrap'

const styles = {

    margin: 20,
}

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        setVisible(!visible)
    }
    return (
        <div>
            <Button variant="secondary" size='sm' onClick={handleClick} style={styles}>Filter Date</Button>
            {visible && props.children}
        </div >)
}

export default Togglable
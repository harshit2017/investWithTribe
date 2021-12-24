import { useState } from 'react'

import { Form, Button } from 'react-bootstrap';


const Register = ({ handleSignup }) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')



    const handleSubmit = (event) => {
        event.preventDefault()
        if (password !== confirmPassword) alert("Passwords don't match")
        else
            handleSignup(name, email, password, confirmPassword)
        setEmail('')
        setPassword('')

        setName('')
        setConfirmPassword('')

    }

    return <div>
        <h2>Sign Up</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required name="name" value={name} onChange={({ target }) => setName(target.value)} />
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required name="email" value={email} onChange={({ target }) => setEmail(target.value)} />
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required name="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="confirmPassword" value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} />
            </Form.Group>
            <div className='text-center'>
                <Button variant="primary" type="submit" style={{ marginTop: 10 }}>Create Account</Button>
            </div>
        </Form>
    </div>
}

export default Register
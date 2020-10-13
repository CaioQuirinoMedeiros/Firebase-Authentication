import React, { FormEvent, useCallback, useRef, useState } from 'react'

import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const { signup } = useAuth()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationRef = useRef<HTMLInputElement>(null)

  const handleSignupSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setLoading(true)

      if (!emailRef.current?.value || !passwordRef.current?.value) {
        return
      }

      if (
        passwordConfirmationRef.current?.value !== passwordRef.current?.value
      ) {
        return setError('Passwords do not match')
      }

      try {
        setError('')
        await signup({
          email: emailRef.current?.value,
          password: passwordRef.current?.value
        })
      } catch {
        setError('Failed to create an account')
      } finally {
        setLoading(false)
      }
    },
    [signup]
  )

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center  mb-4'>Sign Up</h2>

          {!!error && <Alert variant='danger'>{error}</Alert>}

          <Form onSubmit={handleSignupSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef}></Form.Control>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                required
                ref={passwordRef}
              ></Form.Control>
            </Form.Group>
            <Form.Group id='password-confirmation'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                required
                ref={passwordConfirmationRef}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' className='w-100' disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='login'>Log In</Link>
      </div>
    </>
  )
}

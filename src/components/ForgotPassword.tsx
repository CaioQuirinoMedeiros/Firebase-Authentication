import React, { FormEvent, useCallback, useRef, useState } from 'react'

import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)

  const handleResetPasswordSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
        setError('')
        setSuccessMessage('')

        await resetPassword(emailRef.current?.value)

        setSuccessMessage('Check your inbox for futher instructions.')
      } catch {
        setError('Failed to reset password')
      } finally {
        setLoading(false)
      }
    },
    [resetPassword]
  )

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center  mb-4'>Password Reset</h2>

          {!!error && <Alert variant='danger'>{error}</Alert>}
          {!!successMessage && <Alert variant='success'>{successMessage}</Alert>}

          <Form onSubmit={handleResetPasswordSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef}></Form.Control>
            </Form.Group>

            <Button type='submit' className='w-100' disabled={loading}>
              {loading ? 'Sending email...' : 'Reset password'}
            </Button>
          </Form>

          <div className='w-100 text-center mt-3'>
            <Link to='login'>Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='signup'>Sign Up</Link>
      </div>
    </>
  )
}

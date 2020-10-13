import React, { FormEvent, useCallback, useRef, useState } from 'react'

import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const history = useHistory()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationRef = useRef<HTMLInputElement>(null)

  const handleUpdateProfileSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setLoading(true)

      if (!emailRef.current?.value) {
        return setError('Fill in a valid e-mail')
      }

      if (
        passwordConfirmationRef.current?.value !== passwordRef.current?.value
      ) {
        return setError('Passwords do not match')
      }

      const promises = []

      if (emailRef.current.value !== currentUser?.email) {
        promises.push(updateEmail(emailRef.current.value))
      }

      if (passwordRef.current?.value) {
        promises.push(updatePassword(passwordRef.current.value))
      }

      try {
        setError('')
        await Promise.all(promises)
        history.push('/')
      } catch {
        setError('Failed to update account')
      } finally {
        setLoading(false)
      }
    },
    [updateEmail, updatePassword, currentUser, history]
  )

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center  mb-4'>Update Profile</h2>

          {!!error && <Alert variant='danger'>{error}</Alert>}

          <Form onSubmit={handleUpdateProfileSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                required
                ref={emailRef}
                defaultValue={currentUser?.email || ''}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>
            <Form.Group id='password-confirmation'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                ref={passwordConfirmationRef}
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>

            <Button type='submit' className='w-100' disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/'>Cancel</Link>
      </div>
    </>
  )
}

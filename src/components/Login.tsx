import React, { FormEvent, useCallback, useRef, useState } from 'react'
import { FaFacebookSquare, FaGooglePlusG } from 'react-icons/fa'

import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { login, loginWithGoogle, loginWithFacebook } = useAuth()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleLoginSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setLoading(true)

      if (!emailRef.current?.value || !passwordRef.current?.value) {
        return
      }

      try {
        setError('')
        await login({
          email: emailRef.current?.value,
          password: passwordRef.current?.value
        })
      } catch {
        setError('Failed to login')
      } finally {
        setLoading(false)
      }
    },
    [login]
  )

  const handleGoogleLoginSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
        setError('')
        await loginWithGoogle()
      } catch (err) {
        if (err.code === 'auth/popup-closed-by-user') {
          return
        }
        console.log({ err })
        setError(err.message || 'Failed to login with Google')
      } finally {
        setLoading(false)
      }
    },
    [loginWithGoogle]
  )

  const handleFacebookLoginSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setLoading(true)

      try {
        setError('')
        await loginWithFacebook()
      } catch (err) {
        if (err.code === 'auth/popup-closed-by-user') {
          return
        }
        console.log({ err })
        setError(err.message || 'Failed to login with Facebook')
      } finally {
        setLoading(false)
      }
    },
    [loginWithFacebook]
  )

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center  mb-4'>Login</h2>

          {!!error && <Alert variant='danger'>{error}</Alert>}

          <Form onSubmit={handleLoginSubmit}>
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

            <Button type='submit' className='w-100' disabled={loading}>
              {loading ? 'Loging in...' : 'Log In'}
            </Button>
          </Form>

          <div className='w-100 text-center mt-3 mb-5'>
            <Link to='forgot-password'>Forgot Password?</Link>
          </div>

          <Button
            style={{ backgroundColor: '#dd4b39', border: 0 }}
            block
            onClick={handleGoogleLoginSubmit}
          >
            <FaGooglePlusG size={30} style={{ marginRight: 20 }} /> Sign in with
            Google
          </Button>
          <Button
            style={{ backgroundColor: '#4064ac', border: 0 }}
            block
            onClick={handleFacebookLoginSubmit}
          >
            <FaFacebookSquare size={30} style={{ marginRight: 20 }} /> Sign in
            with Facebook
          </Button>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='signup'>Sign Up</Link>
      </div>
    </>
  )
}

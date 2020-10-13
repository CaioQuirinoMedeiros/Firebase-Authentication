import React, { useCallback, useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { logout, currentUser } = useAuth()

  const [error, setError] = useState('')

  const handleLogout = useCallback(async () => {
    try {
      setError('')
      await logout()
    } catch {
      setError('Failed to logout')
    }
  }, [logout])

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center  mb-4'>Profile</h2>
          {!!error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email: </strong> {currentUser?.email}
          <Link to='update-profile' className='btn btn-primary w-100 mt-3'>
            Update profile
          </Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  )
}

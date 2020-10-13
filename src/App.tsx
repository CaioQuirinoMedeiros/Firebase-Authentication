import React from 'react'
import { Container } from 'react-bootstrap'

import Routes from './routes'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <div className='w-100' style={{ maxWidth: 400 }}>
          <Routes />
        </div>
      </Container>
    </AuthProvider>
  )
}

export default App

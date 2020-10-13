import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import firebase, { User } from 'firebase'

import { auth } from '../firebase'

interface AuthContext {
  currentUser: User | null
  signup(credentials: {
    email: string
    password: string
  }): Promise<firebase.auth.UserCredential>
  login(credentials: {
    email: string
    password: string
  }): Promise<firebase.auth.UserCredential>
  logout(): Promise<void>
  resetPassword(email: string | undefined): Promise<void>
  updateEmail(email: string): Promise<void> | undefined
  updatePassword(password: string): Promise<void> | undefined
  loginWithGoogle(): Promise<firebase.auth.UserCredential>
  loginWithFacebook(): Promise<firebase.auth.UserCredential>
}

const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

const AuthContext = createContext<AuthContext>({} as AuthContext)

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const signup = useCallback(({ email, password }) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }, [])

  const login = useCallback(({ email, password }) => {
    return auth.signInWithEmailAndPassword(email, password)
  }, [])

  const loginWithGoogle = useCallback(() => {
    return auth.signInWithPopup(googleProvider)
  }, [])

  const loginWithFacebook = useCallback(() => {
    return auth.signInWithPopup(facebookProvider)
  }, [])

  const logout = useCallback(() => {
    return auth.signOut()
  }, [])

  const resetPassword = useCallback((email: string) => {
    return auth.sendPasswordResetEmail(email)
  }, [])

  const updateEmail = useCallback(
    (email: string) => {
      return currentUser?.updateEmail(email)
    },
    [currentUser]
  )

  const updatePassword = useCallback(
    (password: string) => {
      return currentUser?.updatePassword(password)
    },
    [currentUser]
  )

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoadingUser(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(() => {
    return {
      currentUser,
      signup,
      login,
      logout,
      resetPassword,
      updateEmail,
      updatePassword,
      loginWithGoogle,
      loginWithFacebook
    }
  }, [
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    loginWithGoogle,
    loginWithFacebook
  ])

  return (
    <AuthContext.Provider value={value}>
      {!loadingUser && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

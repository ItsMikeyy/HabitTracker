import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth'

export const getUserSession = async (): Promise<Session['user'] | undefined> => {
  const authUserSession = await getServerSession(authOptions)
  return authUserSession?.user
}
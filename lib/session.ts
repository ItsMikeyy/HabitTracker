import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth'

export const session = async ({session, token}: any) => {
    session.user.id = token.id
    return session
}

export const getUserSession = async (): Promise<Session['user'] | undefined> => {
  const authUserSession = await getServerSession(authOptions)
  return authUserSession?.user
}
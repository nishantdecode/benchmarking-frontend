'use server'

import { cookies } from "next/headers";

const logoutAction = async () => {
  const cookieStore = cookies()
  cookies().delete('accessToken')
}

export default logoutAction
'use server'

import { cookies } from "next/headers";
import { store } from "@/lib/store";
import { authApi } from "@/lib/features/services/authApi";

const getUserAction = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken').value;
  const verify = store.dispatch(
    authApi.endpoints.verifyToken.initiate({ token: accessToken })
  );
  const { data } = await verify;
  if(data){
    return data.userObj;
  } else {
    return null
  }
  
}

export default getUserAction
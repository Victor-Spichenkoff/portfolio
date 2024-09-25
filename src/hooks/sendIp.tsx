import { MakeAllFirstRequest } from "@/utils/ip"
import { NextRouter, useRouter } from "next/router"
import { useEffect } from "react"

export const SendIp = () => {
  if(process.env.NODE_ENV == "development")
    return 

  const router = useRouter()

  useEffect(() => {
      if (!router.isReady) return;

      const { notForce } = router.query

      MakeAllFirstRequest(notForce == "true")
  }, [router.isReady])

}
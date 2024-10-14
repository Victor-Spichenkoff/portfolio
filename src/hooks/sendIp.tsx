import { MakeAllFirstRequest } from "@/utils/ip"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const SendIp = () => {
  if(process.env.NODE_ENV == "development")
    return 

  UseGetAndSendIp()
}

const UseGetAndSendIp = () => {
  const router = useRouter()

  useEffect(() => {
      if (!router.isReady) return;

      const { notForce } = router.query

      MakeAllFirstRequest(notForce == "true")
  }, [router.isReady, router.query])
}
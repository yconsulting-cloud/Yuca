'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SuccessClient() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // your logic here (fetch, confirm payment, etc.)
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Payment Success</h1>
      <p>Session ID: {sessionId}</p>
    </div>
  )
}

'use client'
import {useRouter} from "next/navigation";

const AppBar = () => {
  const router = useRouter()

  return (
    <>
      <div className="flex w-full justify-around">
        <button onClick={() => router.push('/')}>
          Home
        </button>
        <button onClick={() => router.push('/login')}>
          login
        </button>
      </div>
    </>
  )
}

export default AppBar
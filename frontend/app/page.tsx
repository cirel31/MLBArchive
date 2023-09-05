import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={'/login'}>
        <div>
          로그인 페이지
        </div>
      </Link>
    </main>
  )
}

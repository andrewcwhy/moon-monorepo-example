import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>We can't find the page you're looking for.</p>
      <p>You can either return to the previous page or visit our homepage.</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
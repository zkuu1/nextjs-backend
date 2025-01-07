import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()

    
  }
})


export const config = {
  matcher: [
    "/dashboard/:path*", // Tambahkan rute dashboard secara eksplisit
    "/((?!_next|.*\\..*).*)", // Abaikan file statis
    "/(api|trpc)(.*)", // Jalankan middleware untuk API
  ],
}
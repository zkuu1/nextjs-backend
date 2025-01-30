import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Daftar rute publik (tidak memerlukan login)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', // Rute untuk halaman sign-in
  '/sign-up(.*)', // Rute untuk halaman sign-up
  '/api/:path*', // Tambahkan rute API publik di sini
]);

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) {
    // Lewati autentikasi untuk rute publik
    return;
  }

  // Proteksi autentikasi untuk rute lainnya
  await auth.protect();
});

export const config = {
  matcher: [
    '/dashboard/:path*', // Tambahkan rute dashboard secara eksplisit
    '/((?!_next|.*\\..*).*)', // Abaikan file statis
    '/(api|trpc)(.*)', // Jalankan middleware untuk API
  ],
};


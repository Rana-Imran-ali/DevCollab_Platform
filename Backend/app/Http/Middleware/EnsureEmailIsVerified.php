<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * EnsureEmailIsVerified Middleware
 *
 * Blocks unverified users from accessing protected routes.
 * Applied on top of auth:sanctum middleware.
 *
 * Usage: Route::middleware(['auth:sanctum', 'verified.email'])
 */
class EnsureEmailIsVerified
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !$request->user()->hasVerifiedEmail()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Your email address is not verified. Please check your inbox.',
                'action'  => 'resend_verification',
            ], 403);
        }

        return $next($request);
    }
}

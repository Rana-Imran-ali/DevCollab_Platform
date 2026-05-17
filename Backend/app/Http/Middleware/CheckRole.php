<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * CheckRole Middleware (RBAC)
 *
 * Checks that the authenticated user has one of the required Spatie roles.
 * Applied per-route for coarse-grained authorization.
 *
 * Usage: Route::middleware(['auth:sanctum', 'role:admin|developer'])
 */
class CheckRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!$request->user()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Authentication required.',
            ], 401);
        }

        foreach ($roles as $role) {
            if ($request->user()->hasRole($role)) {
                return $next($request);
            }
        }

        return response()->json([
            'status'  => 'error',
            'message' => 'You do not have the required role to access this resource.',
            'required_roles' => $roles,
        ], 403);
    }
}

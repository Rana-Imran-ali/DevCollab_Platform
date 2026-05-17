<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\TaskController;
use App\Http\Controllers\Api\V1\ChatController;

/*
|--------------------------------------------------------------------------
| API Routes — DevCollab Platform v1
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // ==========================================
    // 1. AUTHENTICATION (Public Routes)
    // ==========================================
    Route::prefix('auth')->group(function () {

        // Registration & Login
        // Rate limited: 5 attempts per minute per IP (brute-force protection)
        Route::middleware('throttle:5,1')->group(function () {
            Route::post('/register', [AuthController::class, 'register']);
            Route::post('/login', [AuthController::class, 'login']);
        });

        // Password Reset Flow
        // Rate limited: 3 attempts per hour per IP
        Route::middleware('throttle:3,60')->group(function () {
            Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
            Route::post('/reset-password', [AuthController::class, 'resetPassword']);
        });

        // Email Verification via signed URL
        Route::get('/verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])
            ->middleware(['signed'])
            ->name('verification.verify');

        // OAuth Redirects & Callbacks (Google & GitHub)
        // Stateless OAuth for SPA — no session required
        Route::get('/{provider}/redirect', [AuthController::class, 'oauthRedirect'])
            ->where('provider', 'google|github');
        Route::get('/{provider}/callback', [AuthController::class, 'oauthCallback'])
            ->where('provider', 'google|github');

        // ──────────────────────────────────────
        // Protected Auth Routes (Require Token)
        // ──────────────────────────────────────
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::get('/me', [AuthController::class, 'me']);

            // Resend email verification link
            Route::post('/email/resend', [AuthController::class, 'resendVerificationEmail'])
                ->middleware('throttle:3,60');
        });
    });

    // ==========================================
    // Protected Routes
    // Requires: Valid token + Verified email
    // ==========================================
    Route::middleware(['auth:sanctum', 'verified.email'])->group(function () {

        // ==========================================
        // 2. User & Profile Management
        // ==========================================
        Route::prefix('profiles')->group(function () {
            Route::get('/{id}', function ($id) {
                return response()->json(['status' => 'success', 'data' => ['id' => $id]]);
            });
            Route::put('/me', function () {
                return response()->json(['status' => 'success', 'message' => 'Profile updated']);
            });
        });

        // ==========================================
        // 3. Projects & Tasks
        // ==========================================
        Route::apiResource('projects', ProjectController::class);
        Route::apiResource('projects.tasks', TaskController::class);

        // ==========================================
        // 4. Chat & Real-Time
        // ==========================================
        Route::prefix('chat/channels')->group(function () {
            Route::get('/{id}/messages', [ChatController::class, 'index']);
            Route::post('/{id}/messages', [ChatController::class, 'store']);
        });

        // ==========================================
        // 5. Problem Sharing Hub
        // ==========================================
        Route::prefix('problems')->group(function () {
            Route::get('/', function () {
                return response()->json(['status' => 'success', 'data' => []]);
            });
            Route::post('/', function () {
                return response()->json(['status' => 'success', 'message' => 'Problem created'], 201);
            });
        });

        // ==========================================
        // 6. Communities
        // ==========================================
        Route::prefix('communities')->group(function () {
            Route::get('/', function () {
                return response()->json(['status' => 'success', 'data' => []]);
            });
        });

        // ==========================================
        // 7. AI Features
        // Rate limited: 20 requests per hour per user
        // ==========================================
        Route::prefix('ai')
            ->middleware('throttle:20,60')
            ->group(function () {
                Route::post('/code-review', function () {
                    return response()->json(['status' => 'success', 'message' => 'Review processing']);
                });
            });

        // ==========================================
        // 8. Admin-Only Routes (role:admin)
        // ==========================================
        Route::middleware('role:admin')->prefix('admin')->group(function () {
            Route::get('/users', function () {
                return response()->json(['status' => 'success', 'data' => []]);
            });
        });
    });
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\TaskController;
use App\Http\Controllers\Api\V1\ChatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->group(function () {
    
    // ==========================================
    // 1. Authentication
    // ==========================================
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        
        // Protected Auth Routes
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::get('/me', [AuthController::class, 'me']);
        });
    });

    // ==========================================
    // Protected Routes (Require Authentication)
    // ==========================================
    Route::middleware('auth:sanctum')->group(function () {

        // ==========================================
        // 2. User & Profile Management (Placeholders)
        // ==========================================
        Route::prefix('profiles')->group(function () {
            Route::get('/{id}', function ($id) { return response()->json(['message' => 'Profile info']); });
            Route::put('/me', function () { return response()->json(['message' => 'Profile updated']); });
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
        // 5. Problem Sharing Hub (Placeholders)
        // ==========================================
        Route::prefix('problems')->group(function () {
            Route::get('/', function () { return response()->json(['data' => []]); });
            Route::post('/', function () { return response()->json(['message' => 'Problem created']); });
        });

        // ==========================================
        // 6. Communities (Placeholders)
        // ==========================================
        Route::prefix('communities')->group(function () {
            Route::get('/', function () { return response()->json(['data' => []]); });
        });

        // ==========================================
        // 7. AI Features (Placeholders)
        // ==========================================
        Route::prefix('ai')->group(function () {
            Route::post('/code-review', function () { return response()->json(['message' => 'Review processing']); });
        });
    });
});

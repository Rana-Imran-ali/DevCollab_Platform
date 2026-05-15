<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends ApiController
{
    public function register(RegisterRequest $request)
    {
        // Data is already validated by RegisterRequest
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password, // Hashed automatically by Laravel 11 Model casts
        ]);

        // Issue a Personal Access Token (or rely on session cookie for SPA)
        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->successResponse([
            'user' => $user,
            'token' => $token
        ], 'User registered successfully', 201);
    }

    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->errorResponse('Invalid login credentials', [], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        
        // Prevent Session Fixation for SPA users
        $request->session()->regenerate();

        // Issue Token for external API clients
        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->successResponse([
            'user' => $user,
            'token' => $token
        ], 'Login successful');
    }

    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }

        // Invalidate session for SPA users
        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return $this->successResponse(null, 'Successfully logged out');
    }

    public function me(Request $request)
    {
        return $this->successResponse(
            $request->user()->load('roles', 'permissions')
        );
    }
}

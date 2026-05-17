<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends ApiController
{
    // ==========================================
    // REGISTRATION
    // ==========================================

    /**
     * Register a new user and send email verification.
     */
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => $request->password, // Auto-hashed via Model cast (Argon2id)
        ]);

        // Fire Registered event → triggers email verification notification
        event(new Registered($user));

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->successResponse([
            'user'  => $user,
            'token' => $token,
        ], 'Account created. Please verify your email address.', 201);
    }

    // ==========================================
    // LOGIN
    // ==========================================

    /**
     * Authenticate user and issue Sanctum token.
     */
    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->errorResponse('Invalid credentials. Please check your email and password.', [], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        // Prevent Session Fixation for SPA users
        $request->session()->regenerate();

        // Revoke previous tokens to enforce single-device login per session
        $user->tokens()->where('name', 'auth_token')->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->successResponse([
            'user'  => $user->load('roles'),
            'token' => $token,
        ], 'Login successful.');
    }

    // ==========================================
    // LOGOUT
    // ==========================================

    /**
     * Revoke current user token and destroy session.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return $this->successResponse(null, 'You have been securely logged out.');
    }

    // ==========================================
    // CURRENT USER
    // ==========================================

    /**
     * Return the authenticated user with roles and permissions.
     */
    public function me(Request $request)
    {
        return $this->successResponse(
            $request->user()->load('roles', 'permissions')
        );
    }

    // ==========================================
    // EMAIL VERIFICATION
    // ==========================================

    /**
     * Handle email verification via signed URL.
     * Called when user clicks link in their email.
     */
    public function verifyEmail(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        // Guard: verify route signature and hash
        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return $this->errorResponse('Invalid or expired verification link.', [], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return $this->successResponse(null, 'Email already verified.');
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return $this->successResponse(null, 'Email verified successfully. Welcome aboard!');
    }

    /**
     * Resend email verification notification.
     */
    public function resendVerificationEmail(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return $this->successResponse(null, 'Email is already verified.');
        }

        $request->user()->sendEmailVerificationNotification();

        return $this->successResponse(null, 'Verification link resent to your email.');
    }

    // ==========================================
    // PASSWORD RESET
    // ==========================================

    /**
     * Send password reset link to the user's email.
     */
    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return $this->successResponse(null, 'Password reset link sent to your email.');
        }

        return $this->errorResponse('Unable to send reset link. Please try again.', [], 500);
    }

    /**
     * Reset user password using valid token.
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill(['password' => $password])->save();

                // Revoke all existing tokens after password reset for security
                $user->tokens()->delete();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return $this->successResponse(null, 'Password reset successfully. Please log in again.');
        }

        throw ValidationException::withMessages([
            'email' => [__($status)],
        ]);
    }

    // ==========================================
    // OAUTH (Google & GitHub)
    // ==========================================

    /**
     * Redirect to OAuth provider (Google or GitHub).
     * Requires: composer require laravel/socialite
     *
     * Usage: GET /api/v1/auth/{provider}/redirect
     */
    public function oauthRedirect(Request $request, string $provider)
    {
        $this->validateOAuthProvider($provider);

        // Uncomment after installing laravel/socialite:
        // return \Laravel\Socialite\Facades\Socialite::driver($provider)->stateless()->redirect();

        return $this->errorResponse(
            'OAuth is ready to activate. Run: composer require laravel/socialite',
            ['next_step' => 'Install Socialite package and uncomment the redirect line.'],
            501
        );
    }

    /**
     * Handle OAuth provider callback and login/register the user.
     * Usage: GET /api/v1/auth/{provider}/callback
     */
    public function oauthCallback(Request $request, string $provider)
    {
        $this->validateOAuthProvider($provider);

        // Uncomment after installing laravel/socialite:
        // $socialUser = \Laravel\Socialite\Facades\Socialite::driver($provider)->stateless()->user();
        //
        // $user = User::updateOrCreate(
        //     ['email' => $socialUser->getEmail()],
        //     [
        //         'name'              => $socialUser->getName(),
        //         'email'             => $socialUser->getEmail(),
        //         'avatar_url'        => $socialUser->getAvatar(),
        //         'provider'          => $provider,
        //         'provider_id'       => $socialUser->getId(),
        //         'email_verified_at' => now(), // OAuth emails are pre-verified
        //         'password'          => null,   // No password for OAuth accounts
        //     ]
        // );
        //
        // $token = $user->createToken('oauth_token')->plainTextToken;
        // return $this->successResponse(['user' => $user, 'token' => $token], 'OAuth login successful.');

        return $this->errorResponse(
            'OAuth is ready to activate. Run: composer require laravel/socialite',
            ['next_step' => 'Install Socialite and uncomment the callback logic.'],
            501
        );
    }

    /**
     * Validate the OAuth provider is supported.
     */
    private function validateOAuthProvider(string $provider): void
    {
        $supported = ['google', 'github'];

        if (!in_array($provider, $supported)) {
            abort(404, "Provider [{$provider}] is not supported.");
        }
    }
}

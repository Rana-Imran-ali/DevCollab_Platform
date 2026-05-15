<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;
use App\Events\MessageCreated;
use Illuminate\Support\Str;

class ChatController extends ApiController
{
    /**
     * Get messages for a specific channel
     */
    public function index(Request $request, $channelId)
    {
        // TODO: Fetch messages from DB with cursor pagination
        return $this->successResponse([
            [
                'id' => Str::uuid()->toString(),
                'sender_id' => 'mock-user-1',
                'content' => 'Welcome to the channel!',
                'type' => 'text',
                'created_at' => now()->toIso8601String()
            ]
        ], 'Messages retrieved successfully');
    }

    /**
     * Send a new message to a channel
     */
    public function store(Request $request, $channelId)
    {
        // 1. Validate request
        $request->validate([
            'content' => 'required|string',
            'type' => 'sometimes|in:text,code_snippet,file'
        ]);

        // 2. Persist to Database (Mocked for now)
        $message = [
            'id' => Str::uuid()->toString(),
            'sender_id' => $request->user() ? $request->user()->id : 'mock-user-xyz',
            'content' => $request->input('content'),
            'type' => $request->input('type', 'text'),
        ];

        // 3. Broadcast Event to Reverb
        broadcast(new MessageCreated($message, $channelId))->toOthers();

        // 4. Return success immediately
        return $this->successResponse($message, 'Message sent', 201);
    }
}

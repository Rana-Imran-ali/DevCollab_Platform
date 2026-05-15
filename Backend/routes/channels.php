<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Private Chat Channel Authorization
Broadcast::channel('chat.{channelId}', function ($user, $channelId) {
    // In a real application, you would query the database to check 
    // if $user->id exists in the chat_participants table for $channelId
    // For now, we will just allow authenticated users.
    return $user !== null;
});

// Presence Project Channel Authorization
Broadcast::channel('project.{projectId}', function ($user, $projectId) {
    // In a real application, check if $user is a project_member
    return ['id' => $user->id, 'name' => $user->name ?? 'Developer'];
});

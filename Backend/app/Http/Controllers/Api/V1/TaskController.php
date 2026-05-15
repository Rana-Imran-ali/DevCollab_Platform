<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;

class TaskController extends ApiController
{
    public function index(Request $request, $projectId)
    {
        // TODO: Return paginated tasks for project
        return $this->successResponse([
            ['id' => 'task-1', 'project_id' => $projectId, 'title' => 'Setup CI/CD', 'status' => 'To Do']
        ]);
    }

    public function store(Request $request, $projectId)
    {
        // TODO: Create task
        return $this->successResponse([
            'id' => 'task-new',
            'project_id' => $projectId,
            'title' => $request->input('title', 'New Task'),
            'status' => 'Backlog'
        ], 'Task created successfully', 201);
    }

    public function show($projectId, $taskId)
    {
        // TODO: Return task details
        return $this->successResponse([
            'id' => $taskId,
            'project_id' => $projectId,
            'title' => 'Setup CI/CD',
            'status' => 'To Do'
        ]);
    }

    public function update(Request $request, $projectId, $taskId)
    {
        // TODO: Update task
        return $this->successResponse([
            'id' => $taskId,
            'status' => $request->input('status', 'In Progress')
        ], 'Task updated');
    }

    public function destroy($projectId, $taskId)
    {
        // TODO: Delete task
        return $this->successResponse(null, 'Task deleted');
    }
}

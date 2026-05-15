<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;

class ProjectController extends ApiController
{
    public function index(Request $request)
    {
        // TODO: Return paginated list of projects
        return $this->successResponse([
            // Mock data
            ['id' => 'proj-1', 'name' => 'Frontend Redesign', 'status' => 'Active']
        ]);
    }

    public function store(Request $request)
    {
        // TODO: Validate request and create project
        return $this->successResponse([
            'id' => 'proj-new',
            'name' => $request->input('name', 'New Project'),
            'status' => 'Planning'
        ], 'Project created successfully', 201);
    }

    public function show($id)
    {
        // TODO: Return project details
        return $this->successResponse([
            'id' => $id,
            'name' => 'Frontend Redesign',
            'status' => 'Active'
        ]);
    }

    public function update(Request $request, $id)
    {
        // TODO: Update project
        return $this->successResponse([
            'id' => $id,
            'name' => 'Updated Project Name'
        ], 'Project updated');
    }

    public function destroy($id)
    {
        // TODO: Delete project
        return $this->successResponse(null, 'Project deleted');
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Seed RBAC roles and permissions.
     *
     * Run with: php artisan db:seed --class=RolesAndPermissionsSeeder
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ==========================================
        // PERMISSIONS
        // ==========================================
        $permissions = [
            // Project permissions
            'project.create',
            'project.view',
            'project.update',
            'project.delete',

            // Task permissions
            'task.create',
            'task.view',
            'task.update',
            'task.delete',
            'task.assign',

            // Community permissions
            'community.create',
            'community.moderate',

            // Chat permissions
            'chat.send',
            'chat.delete_any',

            // Admin permissions
            'user.manage',
            'role.manage',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ==========================================
        // ROLES
        // ==========================================

        // Super Admin — bypasses all permission checks
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin']);

        // Platform Admin — manages users and platform settings
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->givePermissionTo([
            'project.create', 'project.view', 'project.update', 'project.delete',
            'task.create', 'task.view', 'task.update', 'task.delete', 'task.assign',
            'community.create', 'community.moderate',
            'chat.send', 'chat.delete_any',
            'user.manage', 'role.manage',
        ]);

        // Developer — standard workspace member
        $developer = Role::firstOrCreate(['name' => 'developer']);
        $developer->givePermissionTo([
            'project.create', 'project.view', 'project.update',
            'task.create', 'task.view', 'task.update', 'task.assign',
            'chat.send',
        ]);

        // Viewer — read-only access (clients, stakeholders)
        $viewer = Role::firstOrCreate(['name' => 'viewer']);
        $viewer->givePermissionTo([
            'project.view',
            'task.view',
        ]);

        $this->command->info('✅ Roles and permissions seeded successfully.');
        $this->command->table(
            ['Role', 'Permissions Count'],
            [
                ['super-admin', 'ALL (bypassed)'],
                ['admin', $admin->permissions->count()],
                ['developer', $developer->permissions->count()],
                ['viewer', $viewer->permissions->count()],
            ]
        );
    }
}

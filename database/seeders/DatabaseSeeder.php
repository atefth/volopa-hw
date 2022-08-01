<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = [
            'email' => 'john@doe.com',
            'name' => 'John Doe',
            'password' => Hash::make('password'),
        ];

        DB::table('users')->insert($user);
    }
}

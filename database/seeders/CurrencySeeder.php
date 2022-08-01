<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Currency;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $currencies = [
            ['name' => "GBP"],
            ['name' => "EUR"],
            ['name' => "USD", 'group' => 'other'],
            ['name' => "AUD", 'group' => 'other'],
        ];

        foreach ($currencies as $currency) {
            Currency::create($currency);
        }
    }
}

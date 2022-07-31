<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExchangeRatesController extends Controller
{
    public function convert(Request $request)
    {
        $from_amount = $request->input('from_amount');
        $to_amount = $request->input('to_amount');

        $rate = rand(0, 100);

        if ($from_amount > 0) {
            $response = ['to_amount', $rate * $from_amount];
        } else if ($to_amount > 0) {
            $response = ['from_amount', $rate * $to_amount];

        } else {
            $response = ['error', "Please provide either from or to"];
        }

        return response($response, 200);
    }
}

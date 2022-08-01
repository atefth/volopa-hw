<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Currency;

class ExchangeRatesController extends Controller
{
    public function convert(Request $request)
    {
        $from_currency = $request->input('from_currency');
        $to_currency = $request->input('to_currency');

        $from_amount = $request->input('from_amount');
        $to_amount = $request->input('to_amount');

        $amount = $from_amount || $to_amount;

        $converted_amount = Currency::where('name', '=', $from_currency)->convert($to_currency, $amount);

        if ($from_amount > 0) {
            $response = ['to_amount', $converted_amount];
        } else if ($to_amount > 0) {
            $response = ['from_amount', $converted_amount];

        } else {
            $response = ['error', "Please provide either from or to"];
        }

        return response($response, 200);
    }
}

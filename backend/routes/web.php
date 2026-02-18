<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/proxy-test', function () {
    return 'Proxy is working!';
});

Route::get('/debug', function () {
    return 'Backend Laravel is working!';
});

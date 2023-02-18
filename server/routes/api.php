<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware("auth:sanctum")->group(function () {

    // settings
    Route::get("settings", [SettingController::class, "index"]);
    Route::patch("settings", [SettingController::class, "update"]);

    // products related
    Route::apiResource("brands", BrandController::class);
    Route::apiResource("products", ProductController::class);
    Route::apiResource("categories", CategoryController::class);
    Route::apiResource("units", UnitController::class);

    // sales and purchases
    Route::apiResource("sales", SaleController::class);
    Route::apiResource("purchases", PurchaseController::class);

    // users related
    Route::apiResource("users", UserController::class);
    Route::apiResource("suppliers", SupplierController::class);


    // logout
    Route::post("logout", [AuthController::class, "logout"]);
});

Route::post("auth", [AuthController::class, "auth"]);

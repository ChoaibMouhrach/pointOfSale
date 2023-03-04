<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Purchase;

class DashboardController extends Controller
{

    public function __invoke()
    {
        // get sales
        $sales =  Sale::withSum("products", "product_sale.total_price")->whereHas("products", function ($query) {
            $query->whereRaw("product_sale.total_price IS NOT NULL");
        });

        $total_sales = Sale::from($sales)->sum("products_sum_product_saletotal_price");

        // get purchases
        $purchases = Purchase::withSum("products", "product_purchase.total_cost")->whereHas("products", function ($query) {
            $query->whereRaw("product_purchase.total_cost IS NOT NULL");
        });

        $total_purchases = Purchase::from($purchases)->sum("products_sum_product_purchasetotal_cost");

        // get today sales
        $sales = sale::withSum("products", "product_sale.total_price")->whereDay("created_at", now()->day);

        $today_sales = Sale::from($sales)->sum("products_sum_product_saletotal_price");

        // get today purchases
        $purchases = Purchase::withSum("products", "product_purchase.total_cost")
            ->whereDay("created_at", now()->day);

        $today_purchases = Purchase::from($purchases)->sum("products_sum_product_purchasetotal_cost");

        // get sales per month
        $all_sales =  Sale::withSum("products", "product_sale.total_price");
        $grouped_sales_month = Sale::from($all_sales)->selectRaw("SUM(products_sum_product_saletotal_price) as total_sales, MONTH(created_at) as month")->groupByRaw("MONTH(created_at)")->havingRaw("total_sales IS NOT NULL")->get();

        return [
            "total_sales" => $total_sales,
            "total_purchases" => $total_purchases,
            "today_sales" => $today_sales,
            "today_purchases" => $today_purchases,
            "grouped_sales_month" => $grouped_sales_month
        ];
    }
}

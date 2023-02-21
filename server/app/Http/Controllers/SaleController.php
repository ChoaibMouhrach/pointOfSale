<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use Illuminate\Http\Request;

class SaleController extends Controller
{

    public $possible_fields = ["id", "created_at", "updated_at"];
    public $possible_relations = ["products"];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $paginate = $request->input("paginate");
        $search = $request->input("search");
        $relations = $request->input("relations");
        $fields = $request->input("fields");

        $sales = new Sale();

        if ($relations) {
            $sales = handle_relations($relations, $this->possible_relations, $sales);
        }

        if ($fields) {
            $sales = handle_fields($fields, $this->possible_fields, $sales);
        }

        if ($search) {
            $sales = $sales->where("id", $search);
        }

        if ($paginate) return $sales->paginate($paginate);

        return $sales->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSaleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSaleRequest $request)
    {
        $validated = $request->validated();

        $sale = Sale::create([]);

        $products = $this->convert_array($validated["products"]);

        $sale->products()->sync($products);

        return $sale;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        $relations = $request->input("relations");
        $fields = $request->input("fields");

        $sale = new Sale();

        if ($relations) {
            $sale = handle_relations($relations, $this->possible_relations, $sale);
        }

        if ($fields) {
            $sale = handle_fields($fields, $this->possible_fields, $sale);
        }

        return $sale->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSaleRequest  $request
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSaleRequest $request, Sale $sale)
    {
        $validated = $request->validated();

        $products = $validated["products"] ?? false;

        if ($products) {
            $sale->products()->sync($this->convert_array($products));
        }

        return $sale;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sale $sale)
    {
        $sale->delete();
        return response("", 204);
    }

    public function convert_array($products)
    {
        $result = [];

        foreach ($products as $product) {

            $result[$product["id"]] = [];

            if ($product["quantity"] ?? false) {
                $result[$product["id"]]["quantity"] = $product["quantity"];
            }

            if ($product["total_price"] ?? false) {
                $result[$product["id"]]["total_price"] = $product["total_price"];
            }
        }

        return $result;
    }
}

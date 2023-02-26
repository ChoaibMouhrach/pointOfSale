<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Http\Requests\StorePurchaseRequest;
use App\Http\Requests\UpdatePurchaseRequest;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{

    public $possible_fields = ["id", "supplier_id", "created_at", "updated_at"];
    public $possible_relations = ["products", "supplier"];

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

        $purchases = new Purchase();

        if ($relations) {
            $purchases = handle_relations($relations, $this->possible_relations, $purchases);
        }

        $purchases = $purchases->withSum("products as total_cost", "product_purchase.total_cost")->withCount("products");

        if ($fields) {
            $purchases = handle_fields($fields, $this->possible_fields, $purchases);
        }

        if ($search) {
            $purchases = $purchases->where("supplier_id", $search);
        }

        if ($paginate) return $purchases->paginate($paginate);

        return $purchases->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePurchaseRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePurchaseRequest $request)
    {
        $validated = $request->validated();

        $products = $this->convert_array($validated["products"]);

        $purchase = Purchase::create([
            "supplier_id"  => $validated["supplier_id"]
        ]);

        $purchase->products()->sync($products);

        return $purchase->load("products");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        $relations = $request->input("relations");
        $fields = $request->input("fields");

        $purchase = new Purchase();

        if ($relations) {
            $purchase = handle_relations($relations, $this->possible_relations, $purchase);
        }

        if ($fields) {
            $purchase = handle_fields($fields, $this->possible_fields, $purchase);
        }

        return $purchase->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePurchaseRequest  $request
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePurchaseRequest $request, Purchase $purchase)
    {
        $validated = $request->validated();

        $supplier_id = $validated["supplier_id"] ?? false;
        $products = $validated["products"] ?? false;

        if ($supplier_id) $purchase->update(["supplier_id" => $supplier_id]);

        if ($products) {
            $products = $this->convert_array($products);
            $purchase->products()->sync($products);
        }

        return $purchase;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function destroy(Purchase $purchase)
    {
        $purchase->delete();
        return response("", 204);
    }

    // this function is used to convert data ([{ id : number, total_cost : number, quantity : number }]) to ({ id : { quantity : number, total_cost : number } })
    public function convert_array(array $data)
    {
        $result = [];
        foreach ($data as $piece) {
            $result[$piece["id"]] = [];

            if ($piece["quantity"] ?? false) {
                $result[$piece["id"]]["quantity"] = $piece["quantity"];
            }

            if ($piece["total_cost"] ?? false) {
                $result[$piece["id"]]["total_cost"] = $piece["total_cost"];
            }
        }
        return $result;
    }
}

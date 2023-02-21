<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Models\Product;
use App\Models\Purchase;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public $possible_fields = ["id", "name", "email", "vat", "phone", "created_at", "updated_at"];
    public $possible_relations = ["purchases"];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $paginate = $request->input("paginate");
        $search = $request->input("search");
        $fields = $request->input("fields");
        $relations = $request->input("relations");

        $suppliers = new Supplier();

        if ($relations) {
            $suppliers = handle_relations($relations, $this->possible_relations, $suppliers);
        }

        if ($fields) {
            $suppliers = handle_fields($fields, $this->possible_fields, $suppliers);
        }

        if ($search) {
            $suppliers = $suppliers->where("vat", $search)->orWhere("name", "like", "%" . $search . "%")->orWhere("email", "like", "%" . $search . "%")->orWhere("phone", "like", "%" . $search . "%");
        }

        if ($paginate) return $suppliers->paginate($paginate);

        return $suppliers->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSupplierRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSupplierRequest $request)
    {
        $validated = $request->validated();

        return Supplier::create([
            "name" => $validated["name"],
            "email" => $validated["email"],
            "phone" => $validated["phone"],
            "vat" => $validated["vat"]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $relations = $request->input("relations");
        $fields = $request->input("fields");

        $supplier = new Supplier();

        if ($relations) {
            $relations = handle_relations($relations, $this->possible_relations, $relations);
        }

        if ($fields) {
            $supplier = handle_fields($fields, $this->possible_fields, $supplier);
        }

        return $supplier->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSupplierRequest  $request
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        $validated = $request->validated();

        $supplier->update($validated);

        return $supplier;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return response("", 204);
    }
}

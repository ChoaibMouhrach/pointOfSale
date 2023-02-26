<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public $possible_fields = ["id", "name", "cost", "price", "stock", "image", "created_at", "updated_at"];
    public $possible_relations = ["category", "brand", "unit", "sales", "purchases"];

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

        $products = new Product();

        if ($relations) {
            $products = handle_relations($relations, $this->possible_relations, $products);
        }

        if ($fields) {
            $products = handle_fields($fields, $this->possible_fields, $products);
        }

        if ($search) {
            $products = $products->where("id", $search)->orWhere("name", "like", "%$search%");
        }

        if ($paginate) return $products->paginate($paginate);

        return $products->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile("image")) {
            $validated["image"] = $request->file("image")->store("product_images", "public");
        }

        $product =  Product::create([
            "id" => $validated["id"],
            "name" => $validated["name"],
            "cost" => $validated["cost"],
            "price" => $validated["price"],
            "stock" => $validated["stock"],
            "unit_id" => $validated["unit_id"],
            "brand_id" => $validated["brand_id"],
            "category_id" => $validated["category_id"],
            "image" => $validated["image"] ?? null
        ]);

        return $product;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $relations = $request->input("relations");
        $fields = $request->input("fields");

        $product = new Product();

        if ($relations) {
            $product = handle_relations($relations, $this->possible_relations,  $product);
        }

        if ($fields) {
            $product = handle_fields($fields, $this->possible_fields,  $product);
        }

        return $product->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        if ($request->hasFile("image")) {
            $validated["image"] = $request->file("image")->store("product_images", "public");
        }

        $product->update($validated);

        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response(null, 204);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use Illuminate\Http\Request;

class BrandController extends Controller
{

    public $possible_fields = ["id", "name", "email", "phone", "created_at", "updated_at"];
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
        $fields = $request->input("fields");
        $relations = $request->input("relations");

        $brands = new Brand();

        if ($relations) {
            $brands = handle_relations($relations, $this->possible_relations, $brands);
        }

        if ($fields) {
            $brands = handle_fields($fields, $this->possible_fields, $brands);
        }

        if ($search) {
            $brands = $brands->where("name", "like", "%$search%")->orWhere("id", (int)$search);
        }

        if (!is_null($paginate)) {
            return $brands->paginate((int)$paginate);
        }

        return $brands->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreBrandRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBrandRequest $request)
    {
        $validated = $request->validated();

        $brand = Brand::create([
            "name" => $validated["name"]
        ]);

        return $brand;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        $relations = $request->input("relations");
        $fields = $relations->input("fields");

        $brand = new Brand();

        if ($relations) {
            $brand = handle_relations($relations, $this->possible_relations, $brand);
        }

        if ($fields) {
            $brand = handle_fields($fields, $this->possible_fields, $brand);
        }

        return $brand->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBrandRequest  $request
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        $validated = $request->validated();

        $brand->update($validated);

        return $brand;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy(Brand $brand)
    {
        $brand->delete();
        return response(null, 204);
    }
}

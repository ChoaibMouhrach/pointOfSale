<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\Request as Request;

class CategoryController extends Controller
{

    public $possible_fields = ["id", "name", "created_at", "updated_at"];
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

        $categories = new Category();

        if ($relations) {
            $categories = handle_relations($relations, $this->possible_relations, $categories);
        }

        if ($fields) {
            $fields = handle_fields($fields, $this->possible_fields, $fields);
        }

        if ($search) {
            $categories = $categories->where("name", "like", "%$search%");
        }

        if ($paginate) {
            return $categories->paginate($paginate);
        }

        return $categories->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCategoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCategoryRequest $request)
    {
        $validated = $request->validated();

        $category = Category::create([
            "name" => $validated["name"]
        ]);

        return $category;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        $fields = $request->input("fields");
        $relations = $request->input("relations");

        $category = new Category();

        if ($relations) {
            $category = handle_relations($relations, $this->possible_relations, $category);
        }

        if ($fields) {
            $category = handle_fields($fields, $this->possible_fields, $category);
        }

        return $category->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCategoryRequest  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $validated = $request->validated();

        $category->update($validated);

        return $category;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response(null, 204);
    }
}

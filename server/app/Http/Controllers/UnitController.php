<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use App\Http\Requests\StoreUnitRequest;
use App\Http\Requests\UpdateUnitRequest;
use Illuminate\Http\Request;

class UnitController extends Controller
{

    public $possible_fields = ["id", "name", "shortname", "created_at", "updated_at"];
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
        $fields = $request->input('fields');

        $units = new Unit();

        if ($relations) {
            $units = handle_relations($relations, $this->possible_relations, $units);
        }

        if ($fields) {
            $units = handle_fields($fields, $this->possible_fields, $units);
        }

        if ($search) {
            $units = $units->where("name", "like", "%$search%")->orWhere("shortname", "like", "%$search%");
        }

        if ($paginate) return $units->paginate($paginate);

        return $units->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUnitRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUnitRequest $request)
    {
        $validated = $request->validated();

        return Unit::create([
            "name" => $validated["name"],
            "shortname" => $validated["shortname"]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        $relations = $request->input("relations");
        $fields = $request->input("fields");

        $unit = new Unit();

        if ($relations) {
            $unit = handle_relations($relations, $this->possible_relations, $unit);
        }

        if ($fields) {
            $unit = handle_fields($fields, $this->possible_fields, $unit);
        }

        return $unit->first();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUnitRequest  $request
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUnitRequest $request, Unit $unit)
    {
        $validated = $request->validated();
        $unit->update($validated);
        return $unit;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Unit $unit)
    {
        $unit->delete();
        return response("", 204);
    }
}

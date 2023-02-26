<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "id" => ["required", "unique:products,id"],
            "name" => ["required",  "max:125"],
            "cost" => ["required",  "numeric", "gte:1"],
            "price" => ["required", "numeric", "gte:1"],
            "stock" => ["required", "numeric", "gte:1"],
            "unit_id" => ["required", "numeric", "exists:units,id"],
            "brand_id" => ["required", "numeric", "exists:brands,id"],
            "category_id" => ["required", "numeric", "exists:categories,id"]
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            "id" => ["nullable", "unique:products,id"],
            "name" => ["nullable",  "max:125"],
            "cost" => ["nullable",  "numeric", "gte:1"],
            "price" => ["nullable", "numeric", "gte:1"],
            "stock" => ["nullable", "numeric", "gte:1"],
            "unit_id" => ["nullable", "numeric", "exists:units,id"],
            "brand_id" => ["nullable", "numeric", "exists:brands,id"],
            "category_id" => ["nullable", "numeric", "exists:categories,id"]
        ];
    }
}

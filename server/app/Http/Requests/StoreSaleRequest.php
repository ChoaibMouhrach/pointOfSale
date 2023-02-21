<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSaleRequest extends FormRequest
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
            "products" => ["required", "array"],
            "products.*.id" => ["required", "exists:products,id"],
            "products.*.quantity" => ["required", "numeric"],
            "products.*.total_price" => ["required", "numeric"]
        ];
    }
}

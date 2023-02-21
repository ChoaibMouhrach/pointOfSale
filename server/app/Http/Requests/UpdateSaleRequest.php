<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSaleRequest extends FormRequest
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
            'products' => ["nullable", "array"],
            "products.*.id" => ["required", "exists:products,id"],
            "products.*.quantity" => ["nullable", "numeric"],
            "products.*.total_price" => ["nullable", "numeric"]
        ];
    }
}

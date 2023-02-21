<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePurchaseRequest extends FormRequest
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
            "supplier_id" => ["nullable", "exists:suppliers,id"],
            "products" => ["nullable", 'array'],
            "products.*.id" => ["required", "exists:products,id"],
            "products.*.total_price" => ["nullable", "numeric"],
            "products.*.quantity" => ["nullable", "numeric"]
        ];
    }
}

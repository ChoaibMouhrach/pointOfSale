<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        "supplier_id"
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, "product_purchase", "purchase_id", "product_id", "id", "id", "products")->withPivot("quantity", "total_cost");
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, "supplier_id", "id", "suppliers");
    }
}

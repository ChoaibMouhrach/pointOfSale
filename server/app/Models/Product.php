<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        "id",
        "name",
        "cost",
        "price",
        "stock",
        "image",
        "unit_id",
        "brand_id",
        "category_id"
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, "category_id", "id", "categories");
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class, "brand_id", "id", "brands");
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class, "unit_id", "id", "units");
    }

    public function sales()
    {
        return $this->belongsToMany(Sale::class, "product_sale", "product_id", "sale_id", "id", "id", "sales");
    }

    public function purchases()
    {
        return $this->belongsToMany(Purchase::class, "product_purchase", "product_id", "purchase_id", "id", "id", "purchases");
    }
}

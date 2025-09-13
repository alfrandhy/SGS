<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;
    protected $fillable = [ 'name', 'description', 'parent_id', 'order', 'icon', 'url', 'is_active', 'created_by', 'updated_by'];
    protected $casts = [
        'is_active' => 'boolean',
        'created_by' => 'string',
        'updated_by' => 'string',
    ];
    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }
    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id');
    }
}

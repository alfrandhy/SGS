<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Boq
 *
 * @property $id
 * @property $projectcode
 * @property $partno
 * @property $description
 * @property $material
 * @property $dimension
 * @property $detail
 * @property $qty
 * @property $unit
 * @property $type
 * @property $created_by
 * @property $updated_by
 * @property $created_at
 * @property $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Boq extends Model
{
    protected $primaryKey ='boqcode';
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['boqcode', 'projectcode', 'partno', 'description', 'detail', 'material', 'dimension', 'qty', 'unit', 'type', 'created_by', 'updated_by'];

    /**
     * Get the user that created the customer.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user that last updated the customer.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }



}

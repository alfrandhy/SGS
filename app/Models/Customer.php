<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


/**
 * Class Customer
 *
 * @property string $code
 * @property string $name
 * @property string|null $telp
 * @property string|null $address
 * @property string|null $customer_logo
 * @property string|null $customer_logo_originalname
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 *
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Customer extends Model
{
    protected $primaryKey = 'code';
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'code',
        'telp',
        'address',
        'customer_logo',
        'customer_logo_originalname',
        'created_by',
        'updated_by'
    ];

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

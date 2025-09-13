<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectList extends Model
{
    protected $table = 'projectlists';
    protected $primaryKey = 'projectcode';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'projectcode',
        'customer_code',
        'descriptionwork',
        'projectcategory',
        'pono',
        'sino',
        'podate',
        'orderdatereceived',
        'month',
        'year',
        'deliverydateaccordingtopo',
        'deliverydate',
        'remark',
        'location',
        'lastpayment',
        'top1',
        'top2',
        'top3',
        'top4',
        'projectperformance'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_code', 'code');
    }
}

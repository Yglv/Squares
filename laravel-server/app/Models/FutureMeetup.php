<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FutureMeetup extends Model
{
    use HasFactory;

    public $table = 'future_meetup';

    protected $fillable = [
        'future_meetup_title',
        'future_meetup_date',
        'future_meetup_description',
        'user_id',
    ];
}

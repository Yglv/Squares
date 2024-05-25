<?php

namespace App\Repositories;

use App\Models\FutureMeetup;
use App\Repositories\Interfaces\FutureMeetupRepositoryInterface;

class FutureMeetupRepository implements FutureMeetupRepositoryInterface
{
    public function all()
    {
        return FutureMeetup::all();
    }

    public function create(object $data)
    {
        return FutureMeetup::create([
            'future_meetup_title' => $data->input('title'),
            'future_meetup_date' => $data->input('date'),
            'future_meetup_description' => $data->input('description'),
            'user_id' => $data->input('user_id'),
        ]);
    }

    public function update(object $data, $id)
    {
        $futureMeetup = FutureMeetup::findOrFail($id);
        $futureMeetup->update([
            'future_meetup_title' => $data->input('title'),
            'future_meetup_date' => $data->input('date'),
            'future_meetup_description' => $data->input('description'),
            'user_id' => $data->input('user_id'),
        ]);

        return $futureMeetup;
    }

    public function delete($id)
    {
        $futureMeetup = FutureMeetup::findOrFail($id);
        $futureMeetup->delete();
    }

    public function find($id)
    {
        return FutureMeetup::findOrFail($id);
    }
}

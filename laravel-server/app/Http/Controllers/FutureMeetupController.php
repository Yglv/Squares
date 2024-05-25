<?php

namespace App\Http\Controllers;

use App\Services\FutureMeetupService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class FutureMeetupController extends Controller
{
    public function __construct(protected FutureMeetupService $futureMeetupService)
    {
    }

    public function index()
    {

        $meetups = $this->futureMeetupService->all();

        return Inertia::render('Meetup/MeetupMenu/MeetupMenu', ['meetups' => $meetups]);
    }

    public function store(Request $request)
    {
        Log::channel('stderr')->info($request);
        $meetup = $this->futureMeetupService->create($request);

        return redirect(route('meetups.index'));
    }

    public function destroy($id)
    {
        Log::channel('stderr')->info($id);
        $this->futureMeetupService->delete($id);
    }

    public function update(Request $request, $id)
    {
        Log::channel('stderr')->info($request);
        $meetup = $this->futureMeetupService->update($request, $id);

        return redirect('/meetups');
    }
}

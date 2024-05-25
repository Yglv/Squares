<?php

namespace App\Providers;

use App\Repositories\FutureMeetupRepository;
use App\Repositories\Interfaces\FutureMeetupRepositoryInterface;
use App\Services\FutureMeetupService;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            FutureMeetupRepositoryInterface::class,
            FutureMeetupRepository::class
        );

        $this->app->bind(
            FutureMeetupService::class, function ($app) {
                return new FutureMeetupService($app->make(FutureMeetupRepositoryInterface::class));
            }
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

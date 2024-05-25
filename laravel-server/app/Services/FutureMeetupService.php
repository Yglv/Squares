<?php

namespace App\Services;

use App\Repositories\Interfaces\FutureMeetupRepositoryInterface;

class FutureMeetupService
{
    public function __construct(
        protected FutureMeetupRepositoryInterface $futureMeetupRepository
    ) {
    }

    public function create(object $data)
    {
        return $this->futureMeetupRepository->create($data);
    }

    public function update(object $data, $id)
    {
        return $this->futureMeetupRepository->update($data, $id);
    }

    public function delete($id)
    {
        return $this->futureMeetupRepository->delete($id);
    }

    public function all()
    {
        return $this->futureMeetupRepository->all();
    }

    public function find($id)
    {
        return $this->futureMeetupRepository->find($id);
    }
}

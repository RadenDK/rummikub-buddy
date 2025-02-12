<?php

namespace App\Service;

use GuzzleHttp\Exception\GuzzleException;

class GameStateService
{
    protected ApiService $apiService;

    public function __construct(ApiService $apiService)
    {
        $this->apiService = $apiService;
    }

    public function saveGame(array $gameState): bool
    {
        $baseUrl = env('API_BASE_ENDPOINT');
        $endpoint = "/game";
        $url = $baseUrl . $endpoint;

        $options = [
            'json' => ['gameState' => $gameState]
        ];

        try { // If guzzle throws an exception on fx status code 500, the exception will be caught here
            $response = $this->apiService->postRequest($url, $options);
            return true;
        } catch (GuzzleException $e) {
            return false;
        }
    }
}

<?php

namespace App\Service;

use GuzzleHttp\Exception\GuzzleException;

class PlayerService
{

    protected ApiService $apiService;

    public function __construct(ApiService $apiService)
    {
        $this->apiService = $apiService;
    }

    public function saveMainPlayer(string $email, string $name): array
    {
        $baseUrl = env('API_BASE_ENDPOINT');
        $endpoint = "/players";
        $url = $baseUrl . $endpoint;

        $options = [
            'json' => [
                'email' => $email,
                'name' => $name
            ]
        ];

        try {
            $response = $this->apiService->postRequest($url, $options);
            return json_decode($response->getBody()->getContents(), true);
        } catch (GuzzleException $e) {
            return [];
        }
    }

    public function getListOfPriorUsedPlayers(string $email): array
    {
        $baseUrl = env('API_BASE_ENDPOINT');
        $endpoint = "/players/$email";
        $url = $baseUrl . $endpoint;

        try {
            $response = $this->apiService->getRequest($url);
            return json_decode($response->getBody()->getContents(), true);
        } catch (GuzzleException $e) {
            return [];
        }
    }

    public function test(): string
    {
        $baseUrl = env('API_BASE_ENDPOINT');

        try {
            $response = $this->apiService->getRequest($baseUrl);
            return $response->getBody()->getContents();
        } catch (GuzzleException $e) {
            return "Call to api not working";
        }
    }

}

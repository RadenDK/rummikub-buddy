<?php

namespace App\Service;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;

class ApiService
{
    protected Client $client; // This is the GuzzleHttp\Client instance
    protected string $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('X_API_KEY');
    }

    /**
     * @throws GuzzleException
     */
    public function getRequest(string $url, array $options = []): ResponseInterface
    {
        $options['headers']['x-api-key'] = $this->apiKey;
        return $this->client->get($url, $options);
    }

    /**
     * @throws GuzzleException
     */
    public function postRequest(string $url, array $options = []): ResponseInterface
    {
        $options['headers']['x-api-key'] = $this->apiKey;
        return $this->client->post($url, $options);
    }
}

<?php

namespace App\Service;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;

class ApiService
{
    protected Client $client; // This is the GuzzleHttp\Client instance

    public function __construct()
    {
        $this->client = new Client();
    }

    /**
     * @throws GuzzleException
     */
    public function getRequest(string $url, array $options = []): ResponseInterface
    {
        return $this->client->get($url, $options);
    }


    /**
     * @throws GuzzleException
     */
    public function postRequest(string $url, array $options = []): ResponseInterface
    {
        return $this->client->post($url, $options);
    }
}

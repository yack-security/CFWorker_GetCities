# Cloudflare Worker - City Filter

This Cloudflare Worker fetches city data from the [Countries Now](https://countriesnow.space) and allows filtering by country, city name prefix, and the number of cities returned.

## Features

- Fetches city data for specified countries.
- Filters cities based on the URL path prefix.
- Supports query parameters to limit the number of cities and specify the countries.
- Randomly selects cities up to a specified limit, max is 40.

## Usage

### Endpoint

By default, it will return 5 random cities from Canada, United States and United Kingdom.

- [https://cities.yack.one](https://cities.yack.one)

You can specify the city prefix in the URL path to filter cities by name.

- `https://cities.yack.one/<city-prefix>`
- `https://cities.yack.one/mon`

```bash
curl -s https://cities.yack.one/<city-prefix>

# Example: cities starting with "mon"
curl -s https://cities.yack.one/mon
```

### Query Parameters

- `limit` (optional): Maximum number of cities to return. Default is 5, and the maximum is 40.
- `country` (optional): Comma-separated list of countries to filter cities by. Default is `Canada,United States,United Kingdom`.

### Examples

1. **Get a single city starting with "ci" from Canada, United States and United Kingdom:**

- `https://cities.yack.one/ci?limit=1`

```bash
curl -s https://cities.yack.one/ci?limit=1
```

2. **Get up to 15 cities starting with "to" from Japan:**

- `https://cities.yack.one/to?limit=15&country=Japan`

```bash
curl -s https://cities.yack.one/to?limit=15&country=Japan
```

3. **Get up to 10 cities starting with "ne" from Canada and Mexico:**

- `https://cities.yack.one/ne?limit=10&country=Canada,Mexico`

```bash
curl -s https://cities.yack.one/ne?limit=10&country=Canada,Mexico
```

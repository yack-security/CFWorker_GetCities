addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname.substring(1).toLowerCase() // Get the path and convert to lowercase
  const params = url.searchParams

  // Get the 'limit' and 'country' query parameters
  let limit = params.get('limit') ? parseInt(params.get('limit')) : 1
  limit = limit > 20 ? 20 : limit // Cap the limit at 20
  const countryList = params.get('country') ? params.get('country').split(',') : ['Canada', 'United States']

  const filteredCities = []

  // Fetch cities data for each country
  for (const country of countryList) {
    const apiResponse = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country })
    })
    const data = await apiResponse.json()

    // Filter cities by starting letters
    if (data.error === false && data.data && data.data.length > 0) {
      for (const city of data.data) {
        if (city.toLowerCase().startsWith(path)) {
          filteredCities.push(city)
        }
      }
    }
  }

  // Randomly select cities from the filtered list up to the specified limit
  const responseCities = []
  while (responseCities.length < limit && filteredCities.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredCities.length)
    responseCities.push(filteredCities.splice(randomIndex, 1)[0])
  }

  return new Response(JSON.stringify(responseCities), {
    headers: { 'Content-Type': 'application/json' },
  })
}

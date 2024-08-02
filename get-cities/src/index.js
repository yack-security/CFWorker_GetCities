addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname.substring(1).toLowerCase()
  const params = url.searchParams

  let limit = params.get('limit') ? parseInt(params.get('limit')) : 5
  limit = limit > 40 ? 40 : limit // limit at 40
  const countryList = params.get('country') ? params.get('country').split(',') : ['Canada', 'United States', 'United Kingdom', 'France']

  const filteredCities = []

  // Fetch cities data for each country //
  for (const country of countryList) {
    const apiResponse = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country })
    })
    const data = await apiResponse.json()

    // Filter by starting letters //
    if (data.error === false && data.data && data.data.length > 0) {
      for (const city of data.data) {
        if (city.toLowerCase().startsWith(path)) {
          filteredCities.push(city)
        }
      }
    }
  }

  // Randomly select cities //
  const responseCities = []
  while (responseCities.length < limit && filteredCities.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredCities.length)
    responseCities.push(filteredCities.splice(randomIndex, 1)[0])
  }

  return new Response(JSON.stringify(responseCities), {
    headers: { 'Content-Type': 'application/json' },
  })
}

//fetchData effectue une requette   asynchrone pour récupérer des données de films.
export async function fetchData() {
  const apiUrl = 'https://ott-details.p.rapidapi.com/advancedsearch?start_year=1960&end_year=2023&min_imdb=5&max_imdb=8.8&genre=action&language=english&type=movie&sort=latest&page=1';
  //ici   Nous  Avons Concatener les parametres  dans URL  afin de  faciliter les requettes
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b64f3b4f10mshd1da2d511f004cfp1d9ea7jsnee126a2a1dcf',
      'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json(); 
    return result.results;
  } catch (error) {
    console.error(error);// pour la  capture des erreurs
    throw error;
  }
}

import { useState, useEffect } from 'react';
import SearchIcon from "./search.svg";
import HeroCard from "./HeroCard";
import "./App.css";

const ACCESS_TOKEN = '83f3f01a81479c7c105b8179156aa643';

const App = () => {
  const [heroName, setHeroName] = useState('');
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetchHeroData("Man");
  }, []);

  const fetchHeroData = async (name) => {
    try {
      const response = await fetch(`https://www.superheroapi.com/api.php/${ACCESS_TOKEN}/search/${name}`);
      const data = await response.json();
      
      if (data.response === 'success') {
        const heroResults = await Promise.all(data.results.map(async (hero) => {

          const imageResponse = await fetch(`https://www.superheroapi.com/api.php/${ACCESS_TOKEN}/${hero.id}/image`);
          const imageData = await imageResponse.json();

          const biographyResponse = await fetch(`https://www.superheroapi.com/api.php/${ACCESS_TOKEN}/${hero.id}/biography`);
          const bio = await biographyResponse.json();

          return {
            name: hero.name,
            image: imageData.url,
            alignment: bio.alignment,
            publisher: bio.publisher,
          };
        }));

        setHeroes(heroResults);
      } else {
        alert('Hero not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='app'>
      <h1>SuperHero Hub</h1>
      <div className= 'search'>
        <input
          type="text"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
          placeholder="Enter superhero name"
          required
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => fetchHeroData(heroName)}
        />
      </div>

      {heroes.length > 0 && (
        <div className='container'>
          {heroes.map((hero) => (
            <div>
              <HeroCard hero={hero} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
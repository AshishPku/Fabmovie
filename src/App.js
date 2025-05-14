import React, { useEffect, useState } from "react";
import NavBar from "./components/Header/NavBar";
import Main from "./components/Main";
import Logo from "./components/Header/Logo";
import Search from "./components/Header/Search";
import NumResults from "./components/Header/NumResults";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedList/WatchedSummary";
import WatchedMovieList from "./components/WatchedList/WatchedMovieList";
import MovieList from "./components/MovieList/MovieList";
import ErrorMessage from "./components/ErrorM/ErrorMessage";
import Loading from "./components/ErrorM/Loading";
const KEY = "a55b26e";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [WatchedList, setWatchedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("interstellar");
  /*
  useEffect(function () {
    console.log("After Initial Render.");
  }, []);
  useEffect(function () {
    console.log("After every Render.");
  });
  useEffect(
    function () {
      console.log("On change of query state");
    },
    [query]
  );
  console.log("during Render");
  */
  const handleAddWatch = (movie) => {
    setWatchedList((WatchedList) => [...WatchedList, movie]);
  };
  const handleDeleteWatchedList = (id) => {
    setWatchedList((WatchedList) => WatchedList.filter((e) => e.imdbID !== id));
  };


  

  useEffect(() => {
    const controller = new AbortController();
    async function FetchData() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("Something went wrong in fetching the movies.");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not Found");
        }
        setMovies(data.Search);
        setError("");
        setIsLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    FetchData();
    return function () {
      controller.abort();
    };
  }, [query]);
  return (
    <div>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movie={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MovieList
              handleAddWatch={handleAddWatch}
              WatchedList={WatchedList}
              movie={movies}
            />
          )}
          {error && <ErrorMessage message={error.message} />}
        </Box>
        <Box>
          <WatchedSummary watchedMovie={WatchedList} />
          <WatchedMovieList
            handleDeleteWatchedList={handleDeleteWatchedList}
            watchedMovie={WatchedList}
          />
        </Box>
      </Main>
    </div>
  );
};

export default App;

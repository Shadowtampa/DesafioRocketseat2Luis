import { useEffect, useState } from 'react';

import { api } from './services/api';

import './styles/global.scss';

import { Content, MovieProps } from './components/Content'
import { SideBar, GenreResponseProps } from './components/SideBar';

export function App() {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const SelectedGenre = (SelectedGenre : GenreResponseProps ) => {
    setSelectedGenre(SelectedGenre)
    setSelectedGenreId(SelectedGenre.id)
  }

  useEffect(() => {

    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });

    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

  }, [selectedGenre]);



  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <SideBar
        genres={genres}
        childToParent={SelectedGenre}
      />

      <Content
        movies={movies}
        selectedGenre={selectedGenre}
      />
    </div>
  )
}
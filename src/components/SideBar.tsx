import { useEffect, useState } from "react";
import { Button } from "./Button"

import { api } from '../services/api';

import '../styles/sidebar.scss';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}


type SideBarProps = {
  genres: GenreResponseProps[];
  childToParent: any;
}

export const SideBar = ({ genres, childToParent }: SideBarProps) => {

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })




  }, [selectedGenreId]);

  useEffect(() => {

    childToParent(selectedGenre)


  }, [selectedGenre]);

  return (

    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}
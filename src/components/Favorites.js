import React from 'react';
import Container from 'react-bootstrap/Container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FavoritesList from './FavoritesList'

import "./Favorites.css";

const Favorites = ({
  click,
  record,
  //setDoSaveFaves,
  favoriteOnes,
  sort }) => {

  return (
    <div>
      <Container className="favoritesContainer">
        <div className="favoritesPanel">
          {
            favoriteOnes.length < 1 ?
              "You haven't chosen any favorites yet"
              :
              "Drag your favorites to rank them"
          }
        </div>
        <DndProvider backend={HTML5Backend}>
          <FavoritesList
            favoriteOnes={ favoriteOnes }
            click={ click }
            record={ record }
            //setDoSaveFaves={ setDoSaveFaves }
            sort={ sort }/>
        </DndProvider>
      </Container>
    </div>
  )
}

export default Favorites;
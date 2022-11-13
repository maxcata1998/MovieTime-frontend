import { memo, useCallback, useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { DnDCard } from './DnDCard.js'
import update from 'immutability-helper'
import { ItemTypes } from './ItemTypes.js'

export const FavoritesList = memo(function FavoritesList({favoriteOnes, sort}) {

  const [cards, setCards] = useState(favoriteOnes);
  useEffect(() => {
    if (favoriteOnes.length > 0) {
      setCards(favoriteOnes);
    }
  }, [favoriteOnes.toString()] 
  )

  useEffect(() => {
    let newFavs = cards.map(c => c.id);
    sort(newFavs);
  }, [cards]
  )

  const findCard = useCallback(
    (id) => {
      const card = cards.filter((c) => `${c.id}` === id)[0]
      return {
        card, index: cards.indexOf(card),
      }
    }, [cards]
  )

  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index } = findCard(id)
      setCards(
        update(cards, { $splice: [[index, 1],[atIndex, 0, card],],}),
      );
    }, [findCard, cards, setCards],
  )
  const [,drop] = useDrop(() => ({ accept: ItemTypes.CARD }))

  const style = {
    width: 500,
    margin: '1em',
  }

  return (
    <div ref={drop} style={style}>
      {cards.map((card, index) => (
        <DnDCard
          key={card.id}
          id={`${card.id}`}
          index={index}
          title={card.title}
          poster={card.poster}
          moveCard={moveCard}
          findCard={findCard}
        />
      ))}
    </div>
  )
})

export default FavoritesList
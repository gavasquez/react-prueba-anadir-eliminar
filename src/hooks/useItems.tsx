import { useState } from 'react';
import { type Item, ItemId } from '../App';



export const useItems = ( { INITIAL_VALUE }: {INITIAL_VALUE: Item[]} ) => {

  const [ items, setItems ] = useState<Item[]>( INITIAL_VALUE );

  const addItem = ( text: string ) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      text: text,
      timestamp: Date.now(),
    };
    setItems( prevItems => [ ...prevItems, newItem ] );
  };

  const removeItem = ( id: ItemId ) => {
    setItems( prevItems => {
      return prevItems.filter( currentItem => currentItem.id !== id );
    } );
  };

  return {
    items,
    addItem,
    removeItem
  };
};
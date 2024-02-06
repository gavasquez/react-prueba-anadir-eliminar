import './App.css';
import { Item } from './Item';
import { useItems } from './hooks/useItems';
import { useSEO } from './hooks/useSEO';

export type ItemId = `${ string }-${ string }-${ string }-${ string }-${ string }`;

export interface Item {
  id: ItemId,
  timestamp: number,
  text: string,

}

const INTIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'VideoJuegos🕹️'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Peliculas☣️'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Libros📚'
  }
];

function App() {


  const { items, addItem, removeItem } = useItems( { INITIAL_VALUE: INTIAL_ITEMS } );

  useSEO( {
    title: `[${ items.length }] Prueba tecnica de React`,
    description: 'Añadir y eliminar elementos de una Lista.'
  } );


  const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem( 'item' );
    const isInput = input instanceof HTMLInputElement;
    if ( !isInput || input == null ) return;

    addItem( input.value );
    input.value = '';
  };

  //* Esto es una funcion que devueleve una funcion
  const handleDeleleItem = ( id: ItemId ) => () => {
    removeItem( id );
  };


  return (
    <main>
      <aside>
        <h1>Prueba tecnica de React</h1>
        <h2>Añadir y eliminar elementos de una Lista</h2>
        <form onSubmit={ ( event ) => handleSubmit( event ) } aria-label='Añadir elementos a la vista'>
          <label>
            Elemento a Introducir:
            <input name='item' required type='text'
              placeholder='VideoJuegos 🎮' />
          </label>
          <button>Añadir Elemento a la Lista</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elementos</h2>
        {
          items.length === 0
            ?
            <p>
              <strong>No hay elementos en la Lista.</strong>
            </p>
            :
            <ul>
              { items.map( item => (
                <Item
                  key={ item.id }
                  { ...item }
                  handleDeleleItem={ handleDeleleItem( item.id ) } />
              ) ) }
            </ul>
        }
      </section>
    </main >
  );
}

export default App;

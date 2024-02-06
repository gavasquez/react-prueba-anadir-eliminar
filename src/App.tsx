import { useState } from 'react'
import './App.css'

type ItemId = `${string}-${string}-${string}-${string}-${string}`;

interface Item {
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
]

function App() {

  const [items, setItems] = useState(INTIAL_ITEMS);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem('item');
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;
    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now(),
    }
    setItems(prevItems => [...prevItems, newItem]);

    input.value = '';
  }

  //* Esto es una funcion que devueleve una funcion
  const handleDeleleItem = (id: ItemId) => () => {
    setItems(prevItems => {
      return prevItems.filter(currentItem => currentItem.id !== id);
    });
  }


  return (
    <main>
      <aside>
        <h1>Prueba tecnica de React</h1>
        <h2>Añadir y eliminar elementos de una Lista</h2>
        <form onSubmit={(event) => handleSubmit(event)}>
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
              {items.map(item => (
                <li key={item.id}>
                  {item.text}
                  <button onClick={handleDeleleItem(item.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
        }

      </section>
    </main >
  )
}

export default App

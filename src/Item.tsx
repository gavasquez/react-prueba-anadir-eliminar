
interface Props {
  text: string,
  handleDeleleItem: () => void,
}

export const Item = ( { text, handleDeleleItem }: Props ) => {
  return (
    <li>
      { text }
      <button onClick={ handleDeleleItem }>Eliminar</button>
    </li>
  );
};
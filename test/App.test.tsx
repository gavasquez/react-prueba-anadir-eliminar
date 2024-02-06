import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import App from '../src/App';
import React from "react";
import userEvent from '@testing-library/user-event';

describe( '<App />', () => {
  /* test( 'should work', () => {
    render( <App /> );

    expect(
      screen.getByText( 'Prueba tecnica de React' )
    ).toBeDefined();
  } ); */
  test( 'should add items and remove the item', async () => {
    const user = userEvent.setup();

    render( <App /> );

    //Buscar el input 
    const input = screen.getByRole( 'textbox' );
    expect( input ).toBeDefined();
    //Buscar el formulario
    const form = screen.getByRole( 'form' );
    expect( form ).toBeDefined();

    const button = form.querySelector( 'button' );
    expect( button ).toBeDefined();

    /* await user.type( input, 'andres' );
    await user.click( button! ); */

    /* await user.type( input, 'prueba' );
    await user.click( button! ); */

    const randomText = crypto.randomUUID();
    await user.type( input, randomText );
    await user.click( button! );

    //Asegurar que el elemento se ha agregado
    const list = screen.getByRole( 'list' );
    expect( list ).toBeDefined();
    expect( list.childNodes.length ).toBe( 1 );
    
    //Aegurarnos que lo podemos borrar
    const item = screen.getByText( randomText );
    const removeButton = item.querySelector( 'button' );
    expect( removeButton ).toBeDefined();
    
    await user.click( removeButton! );
    /* screen.debug(); */

    const noResults = screen.getByText('No hay elementos en la lista.');
    expect(noResults).toBeDefined();

  } );
} );
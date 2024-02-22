import { fireEvent, render, screen} from '@testing-library/react'
import { AddCategory } from '../../src/components/AddCategory'

describe('Pruebas en <AddCategory />', () => { 

    test('Debe de cambiar el valor de la caja de texto', () => {
        
        render( <AddCategory onNewCategory={ () => {} } /> ); 
        const input = screen.getByRole('textbox'); 

        fireEvent.input(input, {target: {value: 'Saitama'} }); 

        expect( input.value ).toBe('Saitama'); 
        // screen.debug(); 
    }); 

    test('Debe llamar el onNewCategory si el input tiene un valor', () => { 

        const inputvalue = 'Saitama'; 
        const onNewCategory =jest.fn(); 

        render( <AddCategory onNewCategory={ onNewCategory } /> ); 

        const input = screen.getByRole('textbox'); 
        const form = screen.getByRole('form'); 

        fireEvent.input(input, {target: {value: inputvalue } }); 
        fireEvent.submit(form); 

        // screen.debug(); 

        expect(input.value).toBe(''); 
        expect(onNewCategory).toHaveBeenCalled(); 
        expect(onNewCategory).toHaveBeenCalledTimes(1); 
        expect(onNewCategory).toHaveBeenCalledWith(inputvalue); 

     }); 

     test('No debe llamar el onNewCategory si el input esta vacio', () => {

        const onNewCategory =jest.fn(); 
        render( <AddCategory onNewCategory={ onNewCategory } /> ); 

        const form = screen.getByRole('form');
        fireEvent.submit(form); 

        expect(onNewCategory).toHaveBeenCalledTimes(0); 
        expect(onNewCategory).not.toHaveBeenCalled(); 

     })
})
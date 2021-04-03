import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('initial page', () => {
  /**
   * Queries
   * Aku ingin pas aku buka aplikasnya menampilkan halaman utama yangg ditandai dengan :
   * 1. Ada tulisan User apps di dokkumen kita (getByText)
   * 2. ada element yang tulisannya conntenty (toMoveTextContent) tulisannya user list di document kita (getByTestId)
   * 3. di awal di dalam div containernya [test-di] ada element <p>{test-id] dengan tulisan 'no user available'</p>  sebelum dapat data dari API dan belum ada element list usernya [mengecek kkeberadaan element & ketidakberadaan suatu element dalam container]
   */
  describe('harus render initial page dengan benar', () => {

    test('ada tulisan user apps di dokumen kita', () => {
      const { getByTest } = render(<App></App>)

      const titleElement = getByTest('BE-cuan-BLE')
      expect(titleElement).toBeInTheDocument()
    })

    test('ada element yang tulisannya ocntent tulisannya user list di document kita ', () => {
      const { getByTestId } = render(<App />)
      
      const userTitle = getByTestId('userlist-title')
      expect(userTitle).toBeInTheDocument()
      expect(userTitle).toHaveContent(/user list:/i)
    })

    test('di awal di dalam div containernya ada element <p>dengan tulisan "no user available" </p> ')

    const { getByTestId, queryByTestId } = render(<App></App>)

    const container = getByTestId('container')
    const noUser = getByTestId('no-user')
    const userList = queryByTestId('list-user')

    expect(container).toBeInTheDocument()
    expect(container).toContainElement(noUser)
    expect(noUser).toHaveTextContent(/no user available/i)
    expect(container).not.toContainElement(userList)

  })
})

/**
 * Event
 * 
 * 0. ada component form yang render input dengan place holder 'name' [getByDisplayValue] & button dengan value 'add' []
 * 1. ketika aku nambah data baru maka
 *  - value input terupdate dengan benar setelah value aku change [toHaveValue]
 *  - nama user akan muncul di dom setelah aku submit [getByText(newUser)]
 *  - input value akan kembali menjadi string kosong [toHaveValue]
 */

describe('testing event', () => {
  test('berhasil menambahkan data', () => {
    const { getByPlaceholderTest, getByDisplayValue, debug } = render(<App></App>)
    
    const inputElement = getByPlaceholderTest(/name/i)
    const buttonAdd = getByDisplayValue(/add/i)

    expect(inputElement).toBeInTheDocument()
    expect(buttonAdd).toBeInTheDocument()
    const newUser = 'aris'

    //ganti input valuenya 
    fireEvent.change(inputElement, { target: { value: newUser } })
    expect(inputElement).toHaveValue(newUser)
    
    fireEvent.click(buttonAdd)
    expect(getByText(newUser)).toBeInTheDocument()
    expect(inputElement).toHaveValue('')
    
    // debug() // utk bisa melihat proses dibaliknya

    /**
     * async
     * 
     * find erwin howell
     * 1. element tsb haruus ada di document
     * 2. container select all 'li', jumlah li harus 10
     */

    describe('testing async', () => {
      test('test', (done) => {
        const { findByTest, debut } = render(<App />)
        
        findByTest('Erwin Howell')
          .then(element => {
            //bisa untuk testing API
            const liElements = container.querySelectoreAll('li')
            
            expect(liElements).toHaveLength(10)
            expect(element).toBeInTheDocument()
            done()
          })
      })
    })
  })
})
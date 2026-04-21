import { expect, test, describe } from 'vitest'
import { sum } from './filterPosts'
import filterPosts from './filterPosts'

// describe('sum', () => {
//     test('return sum ', () => {
//         expect(sum(1, 2)).toBe(3)
//         expect(sum(1, 2)).toBe(2)
//         expect(sum(2, 2)).toBe(4)
//     })

//     test('return Nan', () => {
//         expect(sum(0, -1)).toBe(-1)
//         expect(sum(0, -2)).toBe(-2)
//     })

//     test('return 0', () => {
//         expect(sum(0, 0)).toBe(0)
//     })
// })


describe('fiterPosts', () => {
    it('return empty Post', () => {
        const posts = [{
            id: 1,
            title: 'one',
            body: 'oneOne'
        },
        {
            id: 2,
            title: 'two',
            body: 'twoTwo'
        }]
        const sort = 'title';
        const search = 'ok'

        expect(filterPosts(search, sort, posts).toBe(posts))
    })
})




// function fetchUser(id: number) {
//   return Promise.resolve({ id, name: 'Alice' })
// }

// test('fetches user by id', async () => {
//   const user = await fetchUser(1)
//   expect(user.name).toBe('Alice')
// })




// describe('math operations', () => {
//   let value

//   beforeEach(() => {
//     value = 0
//   })

//   test('can add', () => {
//     value += 5
//     expect(value).toBe(5)
//   })

//   test('can subtract', () => {
//     value -= 3
//     expect(value).toBe(-3) // value was reset to 0 by beforeEach
//   })
// })

// describe('string operations', () => {
//   let text

//   beforeEach(() => {
//     text = 'hello'
//   })

//   test('can uppercase', () => {
//     expect(text.toUpperCase()).toBe('HELLO')
//   })
// })





// test('mock with custom implementation', () => {
//   const add = vi.fn()
//   add.mockImplementation((a, b) => a + b)

//   expect(add(1, 2)).toBe(3)
//   expect(add(10, 20)).toBe(30)
// })





// test('parses a valid age', () => {
//   expect(parseAge('25')).toBe(25)
// })

// test('rounds down decimal ages', () => {
//   expect(parseAge('25.9')).toBe(25)
// })

// test('handles zero', () => {
//   expect(parseAge('0')).toBe(0)
// })

// test('handles the upper boundary', () => {
//   expect(parseAge('150')).toBe(150)
// })

// test('throws for negative numbers', () => {
//   expect(() => parseAge('-1')).toThrow('Invalid age: -1')
// })

// test('throws for numbers above 150', () => {
//   expect(() => parseAge('151')).toThrow('Invalid age: 151')
// })

// test('throws for non-numeric strings', () => {
//   expect(() => parseAge('abc')).toThrow('Invalid age: abc')
// })

// test('throws for empty string', () => {
//   expect(() => parseAge('')).toThrow('Invalid age: ')
// })
import { getRoles, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, describe, vi } from 'vitest'
import filterPosts from './filterPosts'
import type { Post } from '../../../types/post'
import { loadPosts } from './filterPosts'
import { postService } from '../../../services/postService'
import { Button } from './filterPosts'
import { TestModal } from './filterPosts'

describe('modal', () => {
    it('modal check', async () => {
        const user = userEvent.setup()
        render(<TestModal />)
        await user.click(screen.getByRole('button', {name: /open/i}))
        await user.click(screen.getByRole('button', {name: /close/i}))
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
})

describe('button', () => {
    it('check button', async () => {
        const onClick = vi.fn();
        const user = userEvent.setup()

        render(<Button onClick={onClick} />)
        await user.click(screen.getByRole('button', {name: /open/i}))
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})

vi.mock('../../../services/postService', () => ({
    postService: {
        getPosts: vi.fn()
    },
}))
describe('mock check', () => {
    it('check', async () => {
        vi.mocked(postService.getPosts).mockResolvedValue([
            {id: 1, title: 'fake', body: 'fake'}
        ])
        const result = await loadPosts()
        expect(result).toEqual([{id: 1, title: 'fake', body: 'fake'}])
    })
    
})

describe('filterPosts', () => {
    it('return posts filtered by search', () => {
        const posts = [
            { id: 2, title: 'two', body: 'twoTwo'},
            {id: 1, title: 'one', body: 'oneOne'}
        ]
        const sort = '';
        const search = 'one'
        const result = filterPosts(search, sort, posts);
        expect(result).toEqual([{
            id: 1,
            title: 'one',
            body: 'oneOne'
        }])
    })

    it('return posts filtered by sort', () => {
        const posts = [
            { id: 2, title: 'two', body: 'twoTwo'},
            {id: 1, title: 'one', body: 'oneOne'}
        ]
        const sort = 'title';
        const search = ''
        const result = filterPosts(search, sort, posts);
        expect(result).toEqual([
            {id: 1, title: 'one', body: 'oneOne'},
            {id: 2, title: 'two', body: 'twoTwo'}
        ])
    })

    it('return empty posts filtred by sort', () => {
        const posts: Post[] = [];
        const sort = 'title';
        const search = '';
        const result = filterPosts(search, sort, posts);
        expect(result).toEqual([])
    })

    it('return empty posts filtred by search', () => {
        const posts: Post[] = [];
        const sort = '';
        const search = 'a';
        const result = filterPosts(search, sort, posts);
        expect(result).toEqual([])
    } )

    it('filters posts case-insensitively', () => {
        const posts = [
            { id: 2, title: 'Learn Vue', body: '...' },
            { id: 1, title: 'REACT', body: '...' }
        ]
        const search = 'React';
        const sort = '';
        const result = filterPosts(search, sort, posts)
        expect(result).toEqual([{ id: 1, title: 'REACT', body: '...' }])
        expect(result).toHaveLength(1)
    })

    it('return two filtred posts by search', () => {
        const posts = [
            { id: 2, title: 'Learn Vue', body: '...' },
            { id: 1, title: 'REACT', body: '...' },
            { id: 1, title: 'REACT', body: '...' }
        ]
        const search = 'React';
        const sort = '';
        const result = filterPosts(search, sort, posts)
        expect(result).toEqual([
            { id: 1, title: 'REACT', body: '...' },
            { id: 1, title: 'REACT', body: '...' }
        ])
    })

    it('return two filtred posts by sort body', () => {
        const posts = [
            { id: 2, title: 'React second', body: 'b' },
            { id: 1, title: 'React first', body: 'a' }
        ]
        const search = 'React';
        const sort = 'body';
        const result = filterPosts(search, sort, posts)
        expect(result).toEqual([
            { id: 1, title: 'React first', body: 'a' },
            { id: 2, title: 'React second', body: 'b' }
        ])
    })

    it('return posts by error sort', () => {
        const posts = [
            { id: 2, title: 'Learn Vue', body: '...' },
            { id: 1, title: 'NOREACT', body: 'B REACT' },
            { id: 1, title: 'NOREACT', body: 'A REACT' }
        ]
        const search = '';
        const sort = 'id';
        const result = filterPosts(search, sort, posts)
        expect(result).toEqual([
            { id: 2, title: 'Learn Vue', body: '...' },
            { id: 1, title: 'NOREACT', body: 'B REACT' },
            { id: 1, title: 'NOREACT', body: 'A REACT' }
        ])
    })

    it('return post by not mutate posts', () => {
        const posts = [
            { id: 2, title: 'two', body: 'b' },
            { id: 1, title: 'one', body: 'a' },
        ]

        filterPosts('', 'title', posts)

        expect(posts).toEqual([
            { id: 2, title: 'two', body: 'b' },
            { id: 1, title: 'one', body: 'a' },
        ])
    })
    it('retutn post by partial search', () => {
        const posts = [
            { id: 2, title: 'React basics', body: 'b' },
            { id: 1, title: 'Vue basics', body: 'a' },
            { id: 3, title: 'Testing React apps', body: '...' }
        ]
        const sort = '';
        const search = 'bas';
        const result = filterPosts(search, sort, posts);
        expect(result).toEqual([
            { id: 2, title: 'React basics', body: 'b' },
            { id: 1, title: 'Vue basics', body: 'a' },
        ])
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
import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

describe('Blog tests: ', () => {
    test('likes and url is not defined', () => {
        const blog = {
            title: "interesting blog",
            author: "root"
        }

        const component = render(
            < Blog blog={blog} />
        )

        expect(component.container).toHaveTextContent(
            'interesting blog'
        )


    })

    test('blog likes and url are displaying', () => {
        const blog = {
            title: "interesting blog",
            author: "root",
            likes: 0,
            url: "randomurl.com"
        }

        const component = render(
            <Blog blog={blog} />
        )

        const Felement = component.getByText('randomurl.com')
        const Selement = component.getByText('0')

        expect(Felement).toBeDefined()
        expect(Selement).toBeDefined()
    })
})


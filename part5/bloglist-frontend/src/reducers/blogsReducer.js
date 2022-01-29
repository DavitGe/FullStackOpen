const initialState = []

function getBlog(blogs, id) {
    return blogs.find(blog => blog.id === id)
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return action.data.blogs
        case 'CREATE_BLOG':
            return [...state, action.data.blog]
        case 'LIKE_BLOG': {
            const blog = getBlog(state, action.data.id)
            blog.likes += 1
            return state.map(n => {
                if (n.id === action.data.id) {
                    return blog
                } else {
                    return n
                }
            })
        }
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)
        case 'ADD_COMMENT': {
            const blog = getBlog(state, action.data.id)
            blog.comments = [...blog.comments, action.data.comment]
            return state.map(n => {
                if (n.id === action.data.id) {
                    return blog
                } else {
                    return n
                }
            })
        }
        default:
            return state
    }
}

export const setBlogs = (blogs) => {
    return {
        type: 'SET_BLOGS',
        data: {
            blogs: blogs
        }
    }
}

export const createBlog = (blog) => {
    return {
        type: 'CREATE_BLOG',
        data: {
            blog: blog
        }
    }
}

export const likeBlog = (id) => {
    return {
        type: 'LIKE_BLOG',
        data: {
            id: id
        }
    }
}

export const removeBlog = (id) => {
    return {
        type: 'REMOVE_BLOG',
        data: {
            id: id
        }
    }
}

export const addComment = ({ id, comment }) => {
    return {
        type: 'ADD_COMMENT',
        data: {
            id: id,
            comment: comment
        }
    }
}

export default reducer

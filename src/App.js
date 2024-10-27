import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({ title: '', author: '', genre: '', price: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async() => {
        const response = await axios.get('https://librarybackend-il7f.onrender.com/books');
        setBooks(response.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (isEditing) {
            await axios.put(`https://librarybackend-il7f.onrender.com/books/${editId}`, form);
            setIsEditing(false);
        } else {
            await axios.post('https://librarybackend-il7f.onrender.com/books', form);
        }
        setForm({ title: '', author: '', genre: '', price: '' });
        fetchBooks();
    };

    const handleDelete = async(id) => {
        await axios.delete(`https://librarybackend-il7f.onrender.com/books/${id}`);
        fetchBooks();
    };

    const handleEdit = (book) => {
        setForm(book);
        setIsEditing(true);
        setEditId(book._id);
    };

    return ( <
        div className = "app-container" >
        <
        h1 > Bookstore < /h1> <
        form className = "book-form"
        onSubmit = { handleSubmit } >
        <
        input className = "form-input"
        name = "title"
        value = { form.title }
        onChange = { handleInputChange }
        placeholder = "Title"
        required /
        >
        <
        input className = "form-input"
        name = "author"
        value = { form.author }
        onChange = { handleInputChange }
        placeholder = "Author"
        required /
        >
        <
        input className = "form-input"
        name = "genre"
        value = { form.genre }
        onChange = { handleInputChange }
        placeholder = "Genre"
        required /
        >
        <
        input className = "form-input"
        name = "price"
        value = { form.price }
        onChange = { handleInputChange }
        placeholder = "Price"
        required /
        >
        <
        button className = "form-button"
        type = "submit" > { isEditing ? 'Update' : 'Add' }
        Book <
        /button> <
        /form>

        <
        ul className = "book-list" > {
            books.map((book) => ( <
                li key = { book._id }
                className = "book-item" >
                <
                span > { book.title }
                by { book.author } - { book.genre }($ { book.price }) < /span> <
                div >
                <
                button className = "edit-button"
                onClick = {
                    () => handleEdit(book) } > Edit < /button> <
                button className = "delete-button"
                onClick = {
                    () => handleDelete(book._id) } > Delete < /button> <
                /div> <
                /li>
            ))
        } <
        /ul> <
        /div>
    );
}

export default App;
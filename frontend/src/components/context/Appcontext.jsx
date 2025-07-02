// AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [blog, setBlog] = useState([]);
    const [author, setAuthor] = useState(null);
    return (
        <AppContext.Provider value={{ user, setUser, blog, setBlog, author, setAuthor }}>
            {children}
        </AppContext.Provider>
    );
};

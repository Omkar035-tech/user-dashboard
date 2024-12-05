import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userCount, setUserCount] = useState(0);

    const contextVal = { userCount, setUserCount }

    return (
        <UserContext.Provider value={contextVal}>
            {children}
        </UserContext.Provider>
    );
};

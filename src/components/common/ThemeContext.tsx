// ThemeContext.tsx
import React, { createContext, useState } from 'react';

const ThemeContext = createContext<{
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}>({
    isDarkMode: false,
    toggleDarkMode: () => {},
});

export const useTheme = () => React.useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

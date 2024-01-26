import React, { createContext, useState, useEffect, useContext } from 'react';

const StopwatchContext = createContext();

export const StopwatchProvider = ({ children }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <StopwatchContext.Provider value={{ time, setTime, isRunning, setIsRunning }}>
            {children}
        </StopwatchContext.Provider>
    );
};

// hook for using StopwatchContext
export const useStopwatch = () => {
    const context = useContext(StopwatchContext);
    if (!context) {
        throw new Error('useStopwatch must be used within a StopwatchProvider');
    }
    return context;
};

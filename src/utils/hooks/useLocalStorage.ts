import { useState, useEffect, Dispatch, SetStateAction } from "react";

function useLocalStorage(
    key: string,
    initialValue: string
): [string, Dispatch<SetStateAction<string>>] {
    const [storedValue, setStoredValue] = useState<string>(() => {
        try {
            const item = window?.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window?.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;

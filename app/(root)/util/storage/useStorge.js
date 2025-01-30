import { useState, useEffect } from "react";

function useStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // Server-side rendering check
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      const storedValue = localStorage.getItem(key);
      // Handle case where stored value is "undefined"
      return storedValue && storedValue !== "undefined" 
        ? JSON.parse(storedValue)
        : initialValue;
    } catch (error) {
      console.error("Error parsing localStorage value:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorageChange = (e) => {
        if (e.key === key) {
          try {
            const newValue = e.newValue && e.newValue !== "undefined" 
              ? JSON.parse(e.newValue)
              : initialValue;
            setValue(newValue);
          } catch (error) {
            console.error("Error parsing updated localStorage value:", error);
          }
        }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [key, initialValue]);

  const setStoredValue = (newValue) => {
    // Prevent storing undefined values
    if (typeof newValue === "undefined") {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
      setValue(initialValue);
      return;
    }

    setValue(newValue);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  };

  return [value, setStoredValue];
}

export default useStorage;
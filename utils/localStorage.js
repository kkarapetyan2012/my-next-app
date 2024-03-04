'use client'

// utils/localStorage.js

// Function to save state to localStorage
export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (err) {
      console.error("Could not save state", err);
    }
};
  
// Function to load state from localStorage
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined; // No state in localStorage
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
};

// utils/localStorage.js
export function getInitialUsers() {
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        return JSON.parse(storedUsers);
      }
    }
    return [];
}
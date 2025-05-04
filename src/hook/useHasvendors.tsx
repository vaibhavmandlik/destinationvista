import { useState, useEffect } from 'react';

const useHasVendors = () => {
  const getVendorFromLocalStorage = () => {
    return localStorage.getItem('selectedVendor');
  };

  const [hasVendor, setHasVendor] = useState<string | null>(getVendorFromLocalStorage());

  // Update the state whenever the localStorage changes within the same window
  const handleStorageChange = () => {
    setHasVendor(getVendorFromLocalStorage());
  };

  useEffect(() => {
    // Watch for changes in localStorage within the same window
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = (key, value) => {
      // Call the original setItem
      originalSetItem.apply(localStorage, [key, value]);

      // Manually update the state whenever localStorage changes
      if (key === 'selectedVendor') {
        handleStorageChange();
      }
    };

    // Watch for changes across different windows/tabs using the storage event
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === 'selectedVendor') {
        setHasVendor(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageEvent);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  return hasVendor;
};

export default useHasVendors;

/**
 * Safe session storage utility with error handling
 */

export const sessionStorage = {
  /**
   * Get an item from session storage
   * @param key - The key to retrieve
   * @param defaultValue - Default value if key doesn't exist or parsing fails
   * @returns The parsed value or default value
   */
  getItem: <T>(key: string, defaultValue: T): T => {
    try {
      const item = window.sessionStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from session storage (key: ${key}):`, error);
      return defaultValue;
    }
  },

  /**
   * Set an item in session storage
   * @param key - The key to set
   * @param value - The value to store
   * @returns True if successful, false otherwise
   */
  setItem: <T>(key: string, value: T): boolean => {
    try {
      const serialized = JSON.stringify(value);
      window.sessionStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error(`Error writing to session storage (key: ${key}):`, error);
      return false;
    }
  },

  /**
   * Remove an item from session storage
   * @param key - The key to remove
   * @returns True if successful, false otherwise
   */
  removeItem: (key: string): boolean => {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from session storage (key: ${key}):`, error);
      return false;
    }
  },

  /**
   * Clear all items from session storage
   * @returns True if successful, false otherwise
   */
  clear: (): boolean => {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing session storage:', error);
      return false;
    }
  },

  /**
   * Check if session storage is available
   * @returns True if session storage is available
   */
  isAvailable: (): boolean => {
    try {
      const testKey = '__session_storage_test__';
      window.sessionStorage.setItem(testKey, 'test');
      window.sessionStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  },
};

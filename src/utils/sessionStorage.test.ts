import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { sessionStorage } from "./sessionStorage";

describe("sessionStorage utility", () => {
  beforeEach(() => {
    // Clear session storage before each test
    window.sessionStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    window.sessionStorage.clear();
  });

  describe("getItem", () => {
    it("returns default value when key does not exist", () => {
      const result = sessionStorage.getItem("nonexistent", "default");
      expect(result).toBe("default");
    });

    it("returns stored value when key exists", () => {
      window.sessionStorage.setItem("testKey", JSON.stringify("testValue"));
      const result = sessionStorage.getItem("testKey", "default");
      expect(result).toBe("testValue");
    });

    it("returns parsed object when stored", () => {
      const testObj = { name: "John", age: 30 };
      window.sessionStorage.setItem("testObj", JSON.stringify(testObj));
      const result = sessionStorage.getItem("testObj", {});
      expect(result).toEqual(testObj);
    });

    it("returns parsed array when stored", () => {
      const testArray = [1, 2, 3, 4, 5];
      window.sessionStorage.setItem("testArray", JSON.stringify(testArray));
      const result = sessionStorage.getItem<number[]>("testArray", []);
      expect(result).toEqual(testArray);
    });

    it("returns default value on parse error", () => {
      window.sessionStorage.setItem("invalidJson", "{ invalid json }");
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      
      const result = sessionStorage.getItem("invalidJson", "default");
      expect(result).toBe("default");
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it("handles null values correctly", () => {
      window.sessionStorage.setItem("nullValue", JSON.stringify(null));
      const result = sessionStorage.getItem("nullValue", "default");
      expect(result).toBeNull();
    });

    it("handles boolean values correctly", () => {
      window.sessionStorage.setItem("boolValue", JSON.stringify(true));
      const result = sessionStorage.getItem("boolValue", false);
      expect(result).toBe(true);
    });

    it("handles number values correctly", () => {
      window.sessionStorage.setItem("numValue", JSON.stringify(42));
      const result = sessionStorage.getItem("numValue", 0);
      expect(result).toBe(42);
    });
  });

  describe("setItem", () => {
    it("stores string value successfully", () => {
      const result = sessionStorage.setItem("testKey", "testValue");
      expect(result).toBe(true);
      expect(window.sessionStorage.getItem("testKey")).toBe(
        JSON.stringify("testValue")
      );
    });

    it("stores object value successfully", () => {
      const testObj = { name: "Jane", age: 25 };
      const result = sessionStorage.setItem("testObj", testObj);
      expect(result).toBe(true);
      expect(JSON.parse(window.sessionStorage.getItem("testObj")!)).toEqual(
        testObj
      );
    });

    it("stores array value successfully", () => {
      const testArray = ["a", "b", "c"];
      const result = sessionStorage.setItem("testArray", testArray);
      expect(result).toBe(true);
      expect(JSON.parse(window.sessionStorage.getItem("testArray")!)).toEqual(
        testArray
      );
    });

    it("stores null value successfully", () => {
      const result = sessionStorage.setItem("nullKey", null);
      expect(result).toBe(true);
      expect(window.sessionStorage.getItem("nullKey")).toBe("null");
    });

    it("stores boolean value successfully", () => {
      const result = sessionStorage.setItem("boolKey", false);
      expect(result).toBe(true);
      expect(window.sessionStorage.getItem("boolKey")).toBe("false");
    });

    it("stores number value successfully", () => {
      const result = sessionStorage.setItem("numKey", 123);
      expect(result).toBe(true);
      expect(window.sessionStorage.getItem("numKey")).toBe("123");
    });

    it("overwrites existing value", () => {
      sessionStorage.setItem("key", "oldValue");
      sessionStorage.setItem("key", "newValue");
      const result = sessionStorage.getItem("key", "");
      expect(result).toBe("newValue");
    });

    it("returns false and logs error on failure", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const setItemSpy = vi
        .spyOn(window.sessionStorage, "setItem")
        .mockImplementation(() => {
          throw new Error("Storage quota exceeded");
        });

      const result = sessionStorage.setItem("key", "value");
      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();

      setItemSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe("removeItem", () => {
    it("removes existing item successfully", () => {
      window.sessionStorage.setItem("testKey", "testValue");
      const result = sessionStorage.removeItem("testKey");
      expect(result).toBe(true);
      expect(window.sessionStorage.getItem("testKey")).toBeNull();
    });

    it("returns true even when key does not exist", () => {
      const result = sessionStorage.removeItem("nonexistent");
      expect(result).toBe(true);
    });

    it("returns false and logs error on failure", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const removeItemSpy = vi
        .spyOn(window.sessionStorage, "removeItem")
        .mockImplementation(() => {
          throw new Error("Remove failed");
        });

      const result = sessionStorage.removeItem("key");
      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();

      removeItemSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe("clear", () => {
    it("clears all items successfully", () => {
      window.sessionStorage.setItem("key1", "value1");
      window.sessionStorage.setItem("key2", "value2");
      window.sessionStorage.setItem("key3", "value3");

      const result = sessionStorage.clear();
      expect(result).toBe(true);
      expect(window.sessionStorage.length).toBe(0);
    });

    it("returns true when storage is already empty", () => {
      const result = sessionStorage.clear();
      expect(result).toBe(true);
    });

    it("returns false and logs error on failure", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const clearSpy = vi
        .spyOn(window.sessionStorage, "clear")
        .mockImplementation(() => {
          throw new Error("Clear failed");
        });

      const result = sessionStorage.clear();
      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();

      clearSpy.mockRestore();
      consoleSpy.mockRestore();
    });
  });

  describe("isAvailable", () => {
    it("returns true when session storage is available", () => {
      const result = sessionStorage.isAvailable();
      expect(result).toBe(true);
    });

    it("returns false when session storage is not available", () => {
      const setItemSpy = vi
        .spyOn(window.sessionStorage, "setItem")
        .mockImplementation(() => {
          throw new Error("Not available");
        });

      const result = sessionStorage.isAvailable();
      expect(result).toBe(false);

      setItemSpy.mockRestore();
    });

    it("cleans up test key after checking availability", () => {
      sessionStorage.isAvailable();
      expect(
        window.sessionStorage.getItem("__session_storage_test__")
      ).toBeNull();
    });
  });

  describe("integration tests", () => {
    it("handles complete workflow of set, get, and remove", () => {
      const testData = { id: 1, name: "Test Todo", completed: false };

      // Set
      const setResult = sessionStorage.setItem("todo", testData);
      expect(setResult).toBe(true);

      // Get
      const getResult = sessionStorage.getItem("todo", {});
      expect(getResult).toEqual(testData);

      // Remove
      const removeResult = sessionStorage.removeItem("todo");
      expect(removeResult).toBe(true);

      // Verify removed
      const afterRemove = sessionStorage.getItem("todo", null);
      expect(afterRemove).toBeNull();
    });

    it("handles multiple items independently", () => {
      sessionStorage.setItem("key1", "value1");
      sessionStorage.setItem("key2", "value2");
      sessionStorage.setItem("key3", "value3");

      expect(sessionStorage.getItem("key1", "")).toBe("value1");
      expect(sessionStorage.getItem("key2", "")).toBe("value2");
      expect(sessionStorage.getItem("key3", "")).toBe("value3");

      sessionStorage.removeItem("key2");

      expect(sessionStorage.getItem("key1", "")).toBe("value1");
      expect(sessionStorage.getItem("key2", "default")).toBe("default");
      expect(sessionStorage.getItem("key3", "")).toBe("value3");
    });

    it("handles complex nested objects", () => {
      const complexData = {
        user: {
          name: "John",
          preferences: {
            theme: "dark",
            notifications: true,
          },
        },
        todos: [
          { id: 1, text: "Task 1", completed: false },
          { id: 2, text: "Task 2", completed: true },
        ],
      };

      sessionStorage.setItem("appData", complexData);
      const retrieved = sessionStorage.getItem("appData", {});
      expect(retrieved).toEqual(complexData);
    });
  });
});

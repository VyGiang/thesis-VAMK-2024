import {
  GlobalErrorHandling,
  ErrorData,
} from "../error_handling/GlobalErrorHandling";
import mockLocalStorage from "./mocks/LocalStorageMock";

Object.defineProperty(global, "localStorage", {
  value: mockLocalStorage,
});

describe("GlobalErrorHandling", () => {
  let globalErrorHandling: GlobalErrorHandling;

  beforeEach(() => {
    globalErrorHandling = new GlobalErrorHandling();
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe("hasCriticalError", () => {
    it("should return false initially", () => {
      expect(globalErrorHandling.hasCriticalError()).toBe(false);
    });

    it("should return true if there is a critical error", () => {
      globalErrorHandling.parseErrorMessage("Critical error occurred.");
      expect(globalErrorHandling.hasCriticalError()).toBe(true);
    });
  });

  describe("getCriticalErrorMessage", () => {
    it("should return an empty string initially", () => {
      expect(globalErrorHandling.getCriticalErrorMessage()).toBe("");
    });

    it("should return the critical error message", () => {
      const errorMessage = "Critical error occurred.";
      globalErrorHandling.parseErrorMessage(errorMessage);
      expect(globalErrorHandling.getCriticalErrorMessage()).toBe(errorMessage);
    });
  });

  describe("saveDataToStorage", () => {
    it("should save error data to localStorage", () => {
      const errorMessage = "Test error message";
      const errorTime = new Date().toLocaleString();
      globalErrorHandling["saveDataToStorage"](errorMessage, "testKey");

      const storedData = localStorage.getItem("testKey");
      expect(storedData).toBeTruthy();

      const parsedData: ErrorData[] = JSON.parse(storedData || "[]");
      expect(parsedData.length).toBe(1);
      expect(parsedData[0].errorMessage).toBe(errorMessage);
      expect(parsedData[0].errorTime).toBe(errorTime);
    });
  });

  describe("removeErrorMessage", () => {
    it("should remove error message from localStorage", () => {
      localStorage.setItem("testKey", "Some value");
      globalErrorHandling["removeErrorMessage"]();
      expect(localStorage.getItem("testKey")).toBe("Some value");
    });
  });

  describe("parseErrorMessage", () => {
    it("should parse and store critical error message", () => {
      const errorMessage = "Critical error occurred.";
      globalErrorHandling.parseErrorMessage(errorMessage);
      expect(globalErrorHandling.hasCriticalError()).toBe(true);
      expect(globalErrorHandling.getCriticalErrorMessage()).toBe(errorMessage);
    });

    it("should not store non-critical error message", () => {
      const errorMessage =
        "ResizeObserver loop completed with undelivered notifications.";
      globalErrorHandling.parseErrorMessage(errorMessage);
      expect(globalErrorHandling.hasCriticalError()).toBe(false);
      expect(globalErrorHandling.getCriticalErrorMessage()).toBe("");
    });
  });
});

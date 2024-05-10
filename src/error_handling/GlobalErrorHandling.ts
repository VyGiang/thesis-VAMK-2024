import log from "loglevel";

/**
 * These are the error states set by globalErrorHandling
 */
enum ErrorStatuses {
  NO_ERROR = 0,
  CRITICAL_ERROR, // Fatal error and we need to do restart to recover
}
export interface ErrorData {
  errorMessage: string;
  errorTime: string;
}

/**
 * GlobalErrorHandling class
 */
export class GlobalErrorHandling {
  private errorList: ErrorData[] = [];
  public static readonly MAX_MESSAGE = 10;
  private errorStatus: ErrorStatuses = ErrorStatuses.NO_ERROR;
  private errorMessage = "";
  private static readonly key = "CriticalError";
  /**
   * hasCriticalError
   * @returns - current status
   */
  hasCriticalError(): boolean {
    return this.errorStatus === ErrorStatuses.CRITICAL_ERROR;
  }

  /**
   * getCriticalErrorMessage
   * @returns Error text for showing on UI
   */
  getCriticalErrorMessage(): string {
    return this.errorMessage;
  }
  /**
   * save error data to local storage (could be message or timestamp)
   * @param msg - Error message
   */
  private saveDataToStorage(msg: any, key: string) {
    const errorTime = new Date().toLocaleString();
    this.errorList = GlobalErrorHandling.getErrorsFromStorage();
    this.errorList.push({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      errorMessage: msg,
      errorTime: errorTime,
    });

    while (this.errorList.length > GlobalErrorHandling.MAX_MESSAGE) {
      this.errorList.shift();
    }

    localStorage.setItem(key, JSON.stringify(this.errorList));
  }
  /**
   * Get error message from local storage
   * @returns stored messages
   */
  public static getErrorsFromStorage(): ErrorData[] {
    const msgJson = localStorage.getItem(GlobalErrorHandling.key);
    if (msgJson) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return JSON.parse(msgJson);
      } catch (error) {
        return [];
      }
    }
    return [];
  }

  /**
   * Remove error messages in local storage based on key
   */
  removeErrorMessage() {
    localStorage.removeItem(GlobalErrorHandling.key);
  }

  /**
   * parseErrorMessage
   * @param msg - Error message
   */
  parseErrorMessage(msg: any) {
    // Now show only first critical error
    if (
      this.errorStatus === ErrorStatuses.NO_ERROR &&
      this.errorCanBeIgnored(msg) === false
    ) {
      this.saveDataToStorage(msg, GlobalErrorHandling.key);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.errorMessage = this.errorMessage.concat(msg);
      this.errorStatus = ErrorStatuses.CRITICAL_ERROR;
    }
  }

  /* eslint-disable @typescript-eslint/no-explicit-any  */
  /**
   * Checks if the error is such that is can be ignored.
   *
   * @param msg - error message
   * @returns - True if error must not be ignored or False is error can be ignored.
   */
  private errorCanBeIgnored(msg: any): boolean {
    let errorCanBeIgnored = false;
    if (typeof msg === "string") {
      switch (msg) {
        case "ResizeObserver loop completed with undelivered notifications.":
        case "ResizeObserver loop limit exceeded":
          errorCanBeIgnored = true;
          break;
        default:
          break;
      }
      log.warn(
        "GlobalErrorHandling::errorCanBeIgnored: %s, '%s'",
        errorCanBeIgnored.toString().toUpperCase(),
        msg
      );
    } else {
      log.error(
        "GlobalErrorHandling::errorCanBeIgnored: FALSE, can not ignore due to NON-STRING MSG (%s): '%s'",
        typeof msg,
        msg
      );
    }

    return errorCanBeIgnored;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any  */
}

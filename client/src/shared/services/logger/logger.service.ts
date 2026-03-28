type LogPayload = Record<string, unknown> | undefined;

class LoggerService {
  private formatMessage(scope: string | undefined, message: string): string {
    const prefix = scope ? `[${scope}] ` : "";
    return `${prefix}${message}`;
  }

  debug(message: string, payload?: LogPayload, scope?: string): void {
    if (!import.meta.env.DEV) return;
    const text = this.formatMessage(scope, message);
    if (payload !== undefined) {
      console.debug(text, payload);
      return;
    }
    console.debug(text);
  }

  info(message: string, payload?: LogPayload, scope?: string): void {
    const text = this.formatMessage(scope, message);
    if (payload !== undefined) {
      console.info(text, payload);
      return;
    }
    console.info(text);
  }

  warn(message: string, payload?: LogPayload, scope?: string): void {
    const text = this.formatMessage(scope, message);
    if (payload !== undefined) {
      console.warn(text, payload);
      return;
    }
    console.warn(text);
  }

  error(message: string, payload?: LogPayload, scope?: string): void {
    const text = this.formatMessage(scope, message);
    if (payload !== undefined) {
      console.error(text, payload);
      return;
    }
    console.error(text);
  }
}

export const logger = new LoggerService();

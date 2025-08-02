const LogLevel = {
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
};

class LogHandler {
  constructor(level) {
    this.level = level;
    this.next = null;
  }
// Chain of Responsibility Pattern for Logging
// Each handler processes messages of a certain level and passes to the next
  setNext(handler) {
    this.next = handler;
    return handler;
  }

  handle(level, message) {
    if (level >= this.level) {
      // Process the message if this handler's level is sufficient
      this.process(level, message);
    }
    if (this.next) {
      this.next.handle(level, message);
    }
  }

  process(level, message) {
    throw "Override in subclass";
  }
}

// Define specific handlers for different log levels
// ConsoleHandler logs to console, FileHandler logs to a file (simulated here)
class ConsoleHandler extends LogHandler {
  process(level, message) {
    console.log(`🖥️ [${level}] ${message}`);
  }
}

class FileHandler extends LogHandler {
  constructor(level) {
    super(level);
    this.logs = [];
  }

  process(level, message) {
    this.logs.push(`[${level}] ${message}`);
  }

  showLogs() {
    console.log("📁 File Logs:");
    this.logs.forEach(log => console.log(log));
  }
}

// Logger class using Singleton pattern
// It manages the chain of handlers and provides logging methods
// Ensures only one instance exists throughout the application
// This is useful for centralized logging configuration
// and consistent logging behavior across the app.
class Logger {
  // Hold the single instance
  static instance;

  constructor() {
    if (Logger.instance) return Logger.instance;

    this.rootHandler = null;       // Start of the chain
    Logger.instance = this;        // Save this as the only instance
  }

  // Get the singleton instance
  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Set the first handler in the chain
  setHandlerChain(handler) {
    this.rootHandler = handler;
  }

  // Common log function
  log(level, message) {
    if (this.rootHandler) {
      this.rootHandler.handle(level, message);
    }
  }

  // Shortcuts for each log level
  debug(msg) { this.log(LogLevel.DEBUG, msg); }
  info(msg)  { this.log(LogLevel.INFO, msg); }
  warn(msg)  { this.log(LogLevel.WARN, msg); }
  error(msg) { this.log(LogLevel.ERROR, msg); }
}


// Create handlers
const consoleHandler = new ConsoleHandler(LogLevel.INFO);
const fileHandler = new FileHandler(LogLevel.WARN);

// Chain them: Console → File
consoleHandler.setNext(fileHandler);

// Get singleton logger and configure it
const logger = Logger.getInstance();
logger.setHandlerChain(consoleHandler);

// Log messages
logger.debug("Debugging...");              // Skipped
logger.info("App started");               // Console
logger.warn("Memory warning!");           // Console + File
logger.error("System failure!");          // Console + File

// View file logs
fileHandler.showLogs();


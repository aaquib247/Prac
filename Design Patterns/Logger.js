// 1. Log Levels (Enum Style)
const LogLevel = {
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
};

// 2. Base LogHandler Class
class LogHandler {
  constructor(level) {
    this.level = level;
    this.next = null;
  }

  setNext(handler) {
    this.next = handler;
    return handler;
  }

  handle(level, message) {
    // Let each handler decide what to do
    this.process(level, message);
  }

  process(level, message) {
    throw "process() must be implemented by subclasses";
  }
}

// 3. Console Handler
class ConsoleHandler extends LogHandler {
  process(level, message) {
    if (level === this.level) {
      console.log(`🖥️ [${this.getLevelName(level)}] ${message}`);
    } else if (this.next) {
      this.next.handle(level, message);
    }
  }

  getLevelName(level) {
    return Object.keys(LogLevel).find(key => LogLevel[key] === level) || level;
  }
}

// 4. Simple File Handler (Simulated)
class FileHandler extends LogHandler {
  constructor(level) {
    super(level);
    this.logs = []; // Simulated file log
  }

  process(level, message) {
    if (level === this.level) {
      this.logs.push(`[${this.getLevelName(level)}] ${message}`);
    } else if (this.next) {
      this.next.handle(level, message);
    }
  }

  showLogs() {
    console.log("📁 File Logs:");
    this.logs.forEach(log => console.log(log));
  }

  getLevelName(level) {
    return Object.keys(LogLevel).find(key => LogLevel[key] === level) || level;
  }
}

// 5. Logger (Singleton)
class Logger {
  static instance = null;

  constructor() {
    this.rootHandler = null;
  }

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  setHandlerChain(handler) {
    this.rootHandler = handler;
  }

  log(level, message) {
    if (this.rootHandler) {
      this.rootHandler.handle(level, message);
    }
  }

  debug(msg) { this.log(LogLevel.DEBUG, msg); }
  info(msg)  { this.log(LogLevel.INFO, msg); }
  warn(msg)  { this.log(LogLevel.WARN, msg); }
  error(msg) { this.log(LogLevel.ERROR, msg); }
}

// 6. Usage Example

// Create handlers
const debugHandler = new ConsoleHandler(LogLevel.DEBUG);
const infoHandler = new ConsoleHandler(LogLevel.INFO);
const errorFileHandler = new FileHandler(LogLevel.ERROR);

// Set up the chain: DEBUG → INFO → FILE
debugHandler.setNext(infoHandler).setNext(errorFileHandler);

// Set up the Logger
const logger = Logger.getInstance();
logger.setHandlerChain(debugHandler);

// Log messages
logger.debug("Debugging details");
logger.info("App started");
logger.error("Something broke!");

// View file logs
errorFileHandler.showLogs();

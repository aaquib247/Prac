class DatabaseConnection {
    // Step 1: Static variable to hold the single instance of DatabaseConnection
    static instance;
  
    // Step 2: Private constructor to simulate a database connection
    constructor() {
      if (DatabaseConnection.instance) {
        throw new Error("You can only create one instance of DatabaseConnection!");
      }
  
      // Simulate database connection setup (e.g., open connection)
      this.connection = "Database connection established";
      console.log(this.connection);
  
      // Step 3: Store the instance for future access
      DatabaseConnection.instance = this;
    }
  
    // Step 4: Public static method to get the single instance
    static getInstance() {
      if (!DatabaseConnection.instance) {
        DatabaseConnection.instance = new DatabaseConnection();  // Create the instance if it doesn't exist
      }
      return DatabaseConnection.instance;  // Return the existing instance
    }
  
    // Simulate querying the database
    query(sql) {
      console.log(`Running query: ${sql}`);
    }
  
    // Method to check connection status
    getConnectionStatus() {
      return this.connection;
    }
  }
  
  // Usage:
  
  // Both of these variables should refer to the same instance
  const db1 = DatabaseConnection.getInstance();
  const db2 = DatabaseConnection.getInstance();
  
  // Both should use the same instance (no new connection should be created)
  console.log(db1 === db2);  // true (both refer to the same instance)
  
  // Run queries using the Singleton database connection
  db1.query("SELECT * FROM users");
  db2.query("INSERT INTO users (name) VALUES ('John Doe')");
  
  // Check connection status
  console.log(db1.getConnectionStatus());  // "Database connection established"
  
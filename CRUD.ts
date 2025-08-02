class UserInfo {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}
}

class UserCRUD {
  private users: UserInfo[] = [];

  // Create - Add a new user
  createUser(name: string, email: string): UserInfo {
    const newUser = new UserInfo(this.users.length + 1, name, email);
    this.users.push(newUser);
    console.log(`Created UserInfo:`, newUser);
    return newUser;
  }

  // Read - Get all users
  getAllUsers(): UserInfo[] {
    console.log('Fetching All Users:');
    return this.users;
  }

  // Read - Get a single user by ID
  getUserById(id: number): UserInfo | undefined {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      console.log(`Found UserInfo:`, user);
    } else {
      console.log(`UserInfo with id ${id} not found.`);
    }
    return user;
  }

  // Update - Update a user by ID
  updateUser(id: number, name: string, email: string): UserInfo | undefined {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      user.name = name;
      user.email = email;
      console.log(`Updated UserInfo:`, user);
      return user;
    } else {
      console.log(`UserInfo with id ${id} not found for update.`);
      return undefined;
    }
  }

  // Delete - Remove a user by ID using filter
  deleteUser(id: number): boolean {
    const initialLength = this.users.length;
    
    // Filter out the user with the matching ID
    this.users = this.users.filter(user => user.id !== id);

    // If the length has changed, that means a user was deleted
    if (this.users.length < initialLength) {
      console.log(`UserInfo with id ${id} deleted.`);
      return true;
    } else {
      console.log(`UserInfo with id ${id} not found for deletion.`);
      return false;
    }
  }
}

// Testing the CRUD Operations
const userCRUD = new UserCRUD();

// Create users
userCRUD.createUser("John Doe", "john@example.com");
userCRUD.createUser("Alice Smith", "alice@example.com");

// Read all users
console.log(userCRUD.getAllUsers());

// Read single user by ID
userCRUD.getUserById(1);

// Update a user
userCRUD.updateUser(1, "Johnathan Doe", "johnathan@example.com");

// Delete a user
userCRUD.deleteUser(2);

// Read all users after delete
console.log(userCRUD.getAllUsers());

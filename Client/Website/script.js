// this is where the ajax code goes with fetch.

// Create User
async function createUser(data) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error('Error creating user:', result.msg || result);
      } else {
        console.log('User created successfully:', result);
      }
    } catch (err) {
      console.error('Network Error creating user:', err);
    }
  }
  
  // Read Users
  async function fetchUsers() {
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
  
      if (!response.ok) {
        console.error('Error fetching users:', users.msg || users);
      } else {
        console.log('Users fetched successfully:', users.users || users);
      }
    } catch (err) {
      console.error('Network Error fetching users:', err);
    }
  }

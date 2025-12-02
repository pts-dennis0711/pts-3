# Admin Credentials Setup

## Database Admin User
A secure admin user has been created in the NeonDB database:

**Username**: `admin`  
**Password**: `admin@1234`

The password is securely hashed using bcrypt before storage in the database.

## Environment Variables
Update your `server/.env` file with the following:

```bash
# Admin Configuration
ADMIN_SECRET_TOKEN=your-secure-random-token-here
```

**Note**: The `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables are no longer needed since authentication now uses the database.

## How to Login
1. Navigate to `/admin/login`
2. Enter:
   - Username: `admin`
   - Password: `admin@1234`
3. You'll receive an authentication token stored in localStorage

## Security Notes
- Passwords are hashed using bcrypt (10 salt rounds)
- The admin token is stored in localStorage on the client
- API requests include the token in the `Authorization` header
- For production, consider implementing JWT with expiration

## Creating Additional Admin Users
Run the script with different credentials:

```javascript
// Edit server/scripts/create-admin.js
const password = 'your-new-password';
const username = 'your-username';
```

Then run:
```bash
node server/scripts/create-admin.js
```

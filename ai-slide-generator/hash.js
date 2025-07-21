import bcrypt from 'bcrypt';

const password = 'hashed-password'; // my test password

bcrypt.hash(password, 10).then(hash => {
  console.log('Hashed password:', hash);
});
import dataSource from '../../config/database.config';
import { User } from '../../entities/user.entity';
import { hashPassword } from '../../common/utils/hash.util';

async function seedUsers() {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');

    const userRepository = dataSource.getRepository(User);

    // Check if user already exists
    const existingUser = await userRepository.findOne({
      where: { email: 'test@example.com' },
    });

    if (existingUser) {
      console.log('Default user already exists. Skipping seed.');
      await dataSource.destroy();
      return;
    }

    // Create default user
    const hashedPassword = await hashPassword('Test@123');
    const user = userRepository.create({
      email: 'test@example.com',
      password_hash: hashedPassword,
      created_at: new Date(),
      name: 'Test User',
    });

    await userRepository.save(user);
    console.log('Default user created successfully!');
    console.log('Email: test@example.com');
    console.log('Password: Test@123');

    await dataSource.destroy();
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

seedUsers();

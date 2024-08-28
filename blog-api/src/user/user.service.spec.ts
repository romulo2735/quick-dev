import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = { name: 'John Doe', email: 'john@example.com', password: 'password' };
    const user = await service.create(createUserDto);
    expect(user).toHaveProperty('id');
    expect(user.name).toBe(createUserDto.name);
    expect(user.email).toBe(createUserDto.email);
    expect(await bcrypt.compare(createUserDto.password, user.password)).toBe(true);
  });

  it('should find all users', () => {
    const users = service.findAll();
    expect(users).toBeInstanceOf(Array);
  });

  // it('should find one user by id', () => {
  //   const createUserDto: CreateUserDto = { name: 'John Doe', email: 'john@example.com', password: 'password' };
  //   const user = service.create(createUserDto);
  //   const foundUser = service.findOne(user.id);
  //   expect(foundUser).toBeDefined();
  //   expect(foundUser.id).toBe(user.id);
  // });

  // it('should find a user by email', () => {
  //   const createUserDto: CreateUserDto = { name: 'John Doe', email: 'john@example.com', password: 'password' };
  //   const user = service.create(createUserDto);
  //   const foundUser = service.findByEmail(user.email);
  //   expect(foundUser).toBeDefined();
  //   expect(foundUser.email).toBe(user.email);
  // });
});

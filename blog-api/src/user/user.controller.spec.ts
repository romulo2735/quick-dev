import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };
    const result = { id: 1, ...createUserDto };
    jest.spyOn(service, 'create').mockImplementation(async () => result);

    expect(await controller.create(createUserDto)).toBe(result);
  });

  it('should find all users', async () => {
    const result = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      },
    ];
    jest.spyOn(service, 'findAll').mockImplementation(() => result);

    expect(controller.findAll()).toBe(result);
  });

  it('should find one user by id', async () => {
    const result = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };
    jest.spyOn(service, 'findOne').mockImplementation(() => result);

    expect(controller.findOne('1')).toBe(result);
  });
});

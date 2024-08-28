import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private users: User[] = [];

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.id = this.users.length + 1;
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = await bcrypt.hash(createUserDto.password, 10);
        this.users.push(user);
        return user;
    }

    findAll(): User[] {
        return this.users;
    }

    findOne(id: number): User {
        return this.users.find(user => user.id === id);
    }

    findByEmail(email: string): User {
        return this.users.find(user => user.email === email);
    }
}

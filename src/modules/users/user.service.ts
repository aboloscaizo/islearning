import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserMapper } from "./mappers/user.mapper";
import { UserRepository } from "./repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    async createUser(data: CreateUserDto) {
      const user = await this.userRepository.createUser({
        email: data.email,
        passwordHash: data.password
      });
      return UserMapper.toResponse(user);
    }
    async findAll() {
        const user = await this.userRepository.findAll()
        return user.map(UserMapper.toResponse);
    }
    async findOne(id: number) {
        const user = await this.userRepository.findOne(id)
        return UserMapper.toResponse(user);
    }
    async updateUser(id: number, data: UpdateUserDto) {
      const updateDate: any = {
       email: data.email,
       role: data.role,
       status: data.status
      }
      if (data.password) updateDate.password = data.password;
      const user = await this.userRepository.updateUser(id, updateDate);
      return UserMapper.toResponse(user);
    }
    async deleteUser(id: number) {
        const user = await this.userRepository.deleteUser(id)
        return UserMapper.toResponse(user);
    }
}
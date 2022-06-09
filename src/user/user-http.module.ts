import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { UserService } from "./user.service";
import { UserContoller } from "./user.contoller";
import { UserModule } from "./user.module";


@Module({
    imports: [UserModule],
    controllers: [UserContoller],
    providers: [UserService]
})
export class UserHttpModule {}
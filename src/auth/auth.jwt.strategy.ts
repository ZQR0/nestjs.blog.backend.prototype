import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtConst } from "./auth.jwt.constants";
import { JwtPayloadInterface } from "./auth.jwt.interface";
import { UserEntity } from "src/entities/user.entity";
import { InjectConfig, ConfigService } from "nestjs-config"
import { AuthService } from "./auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        @InjectConfig() config: ConfigService,
        private readonly jwtConst: typeof JwtConst,
    ) {
        super({
            jwtFromService: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConst
        });
    }

    public async validate(payload: JwtPayloadInterface): Promise<UserEntity> {
        const user = await this.authService.validateUser(payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
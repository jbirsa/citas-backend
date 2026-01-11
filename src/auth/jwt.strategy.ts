import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. 👇 Aquí le dices: "El token viene en el Header Authorization como Bearer"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // 2. 👇 Si el token expiró, lanza error 401 automáticamente (sin que tú hagas nada)
      ignoreExpiration: false,

      // 3. 👇 La misma clave secreta que usaste para firmar (cocinar) el token
      secretOrKey: process.env.API_SECRET || 'secreto_de_amor_123',
    });
  }

  // 4. 👇 Si el token es VÁLIDO (firma correcta y no expirado), se ejecuta esto.
  // Lo que retornes aquí se inyectará en 'request.user' en tus controladores.
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

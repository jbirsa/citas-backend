import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 1. Importar Config
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateModule} from './date/date.module'; // 2. Importar TypeORM

// Importa aquí tus módulos (cuando los crees)
// import { DatesModule } from './dates/dates.module';

@Module({
  imports: [
    // A. Cargar variables de entorno (.env)
    ConfigModule.forRoot({
      isGlobal: true, // Para que esté disponible en toda la app
    }),

    // B. Configuración de Base de Datos
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Lee la URL del .env
      autoLoadEntities: true, // Carga tus entidades automáticamente
      synchronize: false, // ⚠️ IMPORTANTE: En desarrollo ponlo en true (crea tablas auto). En producción suele ir en false.
      ssl: {
        rejectUnauthorized: false, // Requisito obligatorio para conectarse a Neon
      },
    }),
    DateModule,

    // Aquí irán tus módulos de funcionalidad
    // DatesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

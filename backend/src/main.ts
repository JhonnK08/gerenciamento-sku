import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
		methods: ['GET', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
		origin: [
			'http://localhost:5173',
		]
	});

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

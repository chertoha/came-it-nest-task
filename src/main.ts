import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Came IT Test Task')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  //Pipes
  app.useGlobalPipes(new ValidationPipe());

  //Start
  await app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
}
start();

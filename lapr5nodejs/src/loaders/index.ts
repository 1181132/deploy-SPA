import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';;

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const camiaoSchema = {
    name: 'camiaoSchema',
    schema: '../persistence/schemas/camiaoSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const camiaoController = {
    name: config.controllers.camiao.name,
    path: config.controllers.camiao.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const camiaoRepo = {
    name: config.repos.camiao.name,
    path: config.repos.camiao.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const camiaoService = {
    name: config.services.camiao.name,
    path: config.services.camiao.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      camiaoSchema
    ],
    controllers: [
      roleController,
      camiaoController
    ],
    repos: [
      roleRepo,
      userRepo,
      camiaoRepo
    ],
    services: [
      roleService,
      camiaoService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};

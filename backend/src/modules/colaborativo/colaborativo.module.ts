import { Module } from '@nestjs/common';
import { ColaborativoGateway } from './colaborativo.gateway';

@Module({
  providers: [ColaborativoGateway],
  exports: [ColaborativoGateway],
})
export class ColaborativoModule {}

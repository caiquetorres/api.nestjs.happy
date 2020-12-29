import { Module } from '@nestjs/common'

import { OrphanageService } from './services/orphanage.service'

@Module({
    providers: [OrphanageService],
    exports: [OrphanageService]
})
export class OrphanageModule {}

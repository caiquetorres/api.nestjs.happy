import { OrphanageEntity } from '../entities/orphanage.entity'

export class OrphanageProxy {
    public local: string
    public name: string
    public about: string
    public whatsapp: string
    public intructions: string
    public openOnWeekends: boolean
    public pendent: boolean

    public constructor(entity: OrphanageEntity) {
        this.local = entity.local
        this.name = entity.name
        this.about = entity.about
        this.whatsapp = entity.whatsapp
        this.intructions = entity.intructions
        this.openOnWeekends = entity.openOnWeekends
        this.pendent = entity.pendent
    }
}

import { OrphanageEntity } from '../entities/orphanage.entity'

export class OrphanageProxy {
    public id: number
    public local: string
    public name: string
    public about: string
    public whatsapp: string
    public instructions: string
    public openOnWeekends: boolean
    public pendent: boolean

    public constructor(entity: OrphanageEntity) {
        this.id = entity.id
        this.local = entity.local
        this.name = entity.name
        this.about = entity.about
        this.whatsapp = entity.whatsapp
        this.instructions = entity.instructions
        this.openOnWeekends = entity.openOnWeekends
        this.pendent = entity.pendent
    }
}



export class TenantCreatedEvent{
constructor(public readonly email:string,public readonly password:string,public readonly name:string){}

}
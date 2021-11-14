export class RegistrationData{
    public constructor(
    public id: string,
    public email: string,
    public city: string,
    public street: string,
    public firstName: string,
    public lastName: string,
    public zip: string,
    public password?: string,
    ){}
}
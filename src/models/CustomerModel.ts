import ICustomer from "../intefaces/ICustomer";

export class CustomerModel {
    id?: number
    first_name: string
    last_name: string
    email: string
    cpf: string
    password: string
    created_at?: Date
    updated_at?: Date

    constructor({id, first_name, last_name, email, cpf, password, created_at, updated_at}: ICustomer) {
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.cpf = cpf
        this.password = password
        this.created_at = created_at
        this.updated_at = updated_at
    }
}
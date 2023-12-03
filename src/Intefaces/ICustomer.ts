export default interface ICustomer {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    cpf: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}
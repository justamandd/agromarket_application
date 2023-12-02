class CustomerModel {
    id?: BigInt
    first_name: String
    last_name: String
    email: String
    password: String
    created_at?: Date
    updated_at?: Date

    constructor({first_name, last_name, email, password, id, created_at, updated_at}:{first_name: String, last_name: String, email: String, password: String, id?: BigInt, created_at?: Date, updated_at?: Date}) {
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.password = password
        this.created_at = created_at
        this.updated_at = updated_at
    }
}
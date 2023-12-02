abstract class ICustomerService {
    abstract createCustomer(customerInfo: CustomerModel): Promise<CustomerModel>;

    abstract updateCustomer(customerInfo: CustomerModel): Promise<CustomerModel>;

    abstract findCustomer(id: BigInt): Promise<CustomerModel>;

    abstract findCustomer(email: String): Promise<CustomerModel>;

    abstract listCustomers(): Array<Promise<CustomerModel>>;

    abstract deleteUser(id: BigInt): boolean;
}
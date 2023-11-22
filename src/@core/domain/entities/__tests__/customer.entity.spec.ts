import { Customer } from "../customer.entity"

test('Deve criar um cliente', () => {
    const customer = Customer.create({
        name: 'João',
        cpf: '615.754.540-25'
    })

    expect(customer.cpf.value).toBe('61575454025');
})
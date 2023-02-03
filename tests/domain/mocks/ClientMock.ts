import { Client, ClientProps } from "@domain/Client";

export const clientMock = (params: Partial<ClientProps>) => {
  let props: ClientProps = {
    name: params.name ? params.name : "Nome",
    cpf: params.cpf ? params.cpf : "12345678900",
    cnh: params.cnh ? params.cnh : "09876543211",
    birthdate: params.birthdate
      ? params.birthdate
      : new Date(Date.UTC(2000, 8, 20)),
    email: params.email ? params.email : "fakeEmail@example.com",
  };

  return { mock: Client.create({ ...props }), props: props };
};

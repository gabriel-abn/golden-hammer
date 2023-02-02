import { DomainError } from "@domain/common";
import { clientMock } from "./mocks/ClientMock";

describe("Client test", () => {
  it("should have more than 18 years old", () => {
    const client = () =>
      clientMock({
        birthdate: new Date(Date.UTC(2010, 0)),
      });

    expect(client).toThrow(DomainError);
  });
});

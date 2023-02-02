import { DomainError } from "@domain/common";
import { carMock } from "./mocks/CarMock";

describe("Car tests", () => {
  it("should throw if cpf owner is invalid", () => {
    const car = () => {
      carMock({ cpfOwner: " " });
    };

    expect(car).toThrow(DomainError);
  });
  it("should have plate ID in uppercase", () => {
    const { mock } = carMock({ plate: "abc3000" });

    expect(mock.getCarInfo()).toHaveProperty("plate", "ABC3000");
  });
});

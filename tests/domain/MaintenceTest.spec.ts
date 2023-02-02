import { DomainError } from "@domain/common";
import { maintenceMock } from "./mocks/MaintenceMock";

describe("Maintence Tests", () => {
  it("should have valid status", () => {});
  it("should have valid initial date", () => {});
  it("should have valid expected date", () => {
    const maintence = () => {
      maintenceMock({
        initialDate: new Date(Date.now()),
        expectedDate: new Date(2022, 1, 1),
      });
    };

    expect(maintence).toThrow(DomainError);
  });
  it('should have "EM ATRASO" status if expected date expired', () => {
    const { mock } = maintenceMock({ expectedDate: new Date(2023, 1, 1) });

    expect(mock.getInfo()).toHaveProperty("status", "EM ATRASO");
  });
  it("should have valid price", () => {
    const mock = () => maintenceMock({ price: 40.0 });

    expect(mock).toThrow(DomainError);
  });
  it("should contain a description", () => {
    const { mock } = maintenceMock({ description: " " });

    expect(mock.getDescription()).not.toBeTruthy();
  });
});

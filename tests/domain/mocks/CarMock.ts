import { Car, CarProps } from "@domain/Car";

export const carMock = (props: Partial<CarProps>) => {
  const mockProps: CarProps = {
    brand: props.brand ? props.brand : "Random brand",
    color: props.color ? props.color : "Random color",
    cpfOwner: props.cpfOwner ? props.cpfOwner : "000.000.000-00",
    id: props.id ? props.id : "12345",
    model: props.model ? props.model : "Random model",
    plate: props.plate ? props.plate : "RND1234",
  };

  return { mock: Car.create({ ...mockProps }), mockProps: mockProps };
};

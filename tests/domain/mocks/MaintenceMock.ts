import { Maintence, MaintenceProps, MaintenceStatus } from "@domain/Maintence";

export const maintenceMock = (props: Partial<MaintenceProps>) => {
  var mockProps: MaintenceProps = {
    description: props.description ? props.description : "Random description",
    id_car: props.id_car ? props.id_car : "CARID",
    status: props.status ? props.status : MaintenceStatus.EM_CONSERTO,
    id_maintence: props.id_maintence ? props.id_maintence : "Random ID",
    initialDate: props.initialDate ? props.initialDate : new Date(Date.now()),
    expectedDate: props.expectedDate
      ? props.expectedDate
      : new Date(Date.now() + 86400),
    price: props.price ? props.price : 100,
  };

  return { mock: Maintence.create({ ...mockProps }), mockProps: mockProps };
};

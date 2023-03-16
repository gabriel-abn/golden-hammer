import { IParamsValidator } from "@presentation/protocols";

type CheckProperties<T> = {
  [K in keyof T]: T[K];
};

export class ParamsValidator<T extends CheckProperties<T>>
  implements IParamsValidator
{
  validate(request: T): string[] {
    var missingFields: string[] = [];

    // for (const key in Object.keys(request)) {
    //   if (!request[key]) {
    //     missingFields.push(key);
    //   }
    //   if (typeof request[key]) {
    //   }
    // }

    return missingFields;
  }
}

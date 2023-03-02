export interface IPresenter<ResponseModel, Error> {
  showSuccess(responseModel: ResponseModel): object;
  showError(error: Error): object;
}

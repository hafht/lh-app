export interface IBasedCFTask {
  taskId: string;
  stepId: string;
  stepStatusId: number;
}

export interface IBasedInternalPostCFTask extends IBasedCFTask {
  workUnitId: string;
  productId: string;
  jobId: string;
  contentCreationTypeId: number;
  inputAssetsCount: number;
  outputAssetsCount?: number;
}

export interface IInternalPostCFTaskView extends IBasedInternalPostCFTask {
  productCode: string;
  jobCode: string;
}


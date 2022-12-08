import { type } from "os";

export interface IAnalysisModule {
  id: string;
  moduleName: string;
  moduleVersion: string;
}

export type TParameter = {
  id: string;
  parameterName: string;
};

export type TModuleParameter = {
  moduleId: string;
  parameterId: string;
  parameterValue: string;
};

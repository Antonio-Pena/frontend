export interface IAnalysisModule {
  id: string;
  moduleName: string;
  moduleVersion: string;
  isActive: boolean;
  parameters?: TParameter[];
}

export type TParameter = {
  id: string;
  parameterName: string;
};

export type TModuleParameter = {
  id: string;
  moduleId: string;
  parameterId: string;
  parameterValue: string;
};

export type TSetUpParameter = {
  parameterName: string;
  parameterValue: string;
};
export interface ISetUpAnalysisModule {
  id: string;
  moduleName: string;
  moduleVersion: string;
  isActive: boolean;
  parameters?: TSetUpParameter[];
}

export interface IAnalysisModule {
  id: string;
  name: string;
  version: string;
  isActive: boolean;
  parameters?: TParameter[];
}

export interface IUpdateCreateAnalysisModule {
  id: string;
  name?: string;
  version?: string;
  parameters?: string[];
}

export type TParameter = {
  id: string;
  name: string;
};

export type TModuleParameter = {
  id: string;
  moduleId: string;
  parameterId: string;
  parameterValue: string;
};

export type TSetUpParameter = {
  name: string;
  value: string;
};
export interface ISetUpAnalysisModule {
  id: string;
  name: string;
  version: string;
  isActive: boolean;
  parameters?: TSetUpParameter[];
  pipelineId?: string;
}

export interface ICreateSetUpAnalysisModule {
  analysisModuleId: string;
  parameters?: TSetUpParameter[];
  pipelineId: string;
}
export interface IUpdateSetUpAnalysisModule {
  id: string;
  parameters?: TSetUpParameter[];
}

export interface ISetUpPipelineAssesment {
  id: string;
  name: string;
  version: string;
  isActive: boolean;
}

export interface IUpdateCreatePipeline {
  id: string;
  name: string;
  version: string;
}

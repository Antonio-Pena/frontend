import analysisModulesService from "../../../../services/analysisModules";
import { TParameter } from "../../../types/AnalisisModule";

export const createNewParameters = (
  newParameters: TParameter[],
  allParameters: TParameter[]
) => {
  newParameters.forEach(async (p) => {
    const foundParameter = allParameters.find((item) => item.id === p.id);
    if (!foundParameter) {
      const { error } = await analysisModulesService.createParameter(p);
    }
  });
};

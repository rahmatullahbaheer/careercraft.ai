import { template as template1 } from "./template-1";
import { template as template3 } from "./template-3";
import { template as template5 } from "./template-5";
import { template as template7 } from "./template-7";
import { template as template9 } from "./template-9";
import { template as template8 } from "./template-8";
import { template as template14 } from "./template-14";
import { template as template15 } from "./template-15";
import { template as template4 } from "./template-4";

export const getTemplates = (tempId: number) => {
  switch (tempId) {
    case 14:
      return template14;
    case 1:
      return template1;
    case 9:
      return template9;
    case 3:
      return template3;
    case 15:
      return template15;
    case 4:
      return template4;
    case 5:
      return template5;
    case 7:
      return template7;
    case 8:
      return template8;
    default:
      return template5;
  }
};

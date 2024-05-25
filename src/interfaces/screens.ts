import { IClass } from './interfaces';

export interface IClassesScreen {
  id: string;
  name: string;
  classes: {
    period_1: IClass[];
    period_2: IClass[];
    period_3: IClass[];
    period_5: IClass[];
    period_6: IClass[];
    period_7: IClass[];
    period_8: IClass[];
  };
}

export interface IQuestionsScreen {
  id: number;
  class: string;
  id_professor: number;
  professor: string;
}

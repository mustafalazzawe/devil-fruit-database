import { INewFruitData } from "../../providers/Data/Data.types";

export type TAdminFormMode = "create" | "edit";

export interface INameEntry {
  name: string;
  is_spoiler: boolean;
}

export interface ITypeEntry {
  type: string;
  is_spoiler: boolean;
}

export interface IAwakeningEntry {
  is_awakened: boolean;
  is_spoiler: boolean;
}

export interface IUserEntry {
  user: string;
  is_artificial: boolean;
  is_spoiler: boolean;
  awakening: IAwakeningEntry;
}

export interface IAdminFruitFormProps {
  mode: TAdminFormMode;
  fruit?: INewFruitData;
  onSuccess: () => void;
  onCancel: () => void;
}


export type DefaultActions = "EDIT" | "SAVE" | "VIEW" | "DELETE";
export type ModalConfirmation = "YES" | "NO";


export type OnListAction<T = DefaultActions, D = any> = {
  action: T;
  data: D;
};
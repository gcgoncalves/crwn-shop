export type Action = {
  type: string,
  payload: any,
}

export const createAction = (type: string, payload: any): Action => {
  return {
    type,
    payload
  } as Action
}
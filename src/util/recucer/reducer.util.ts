export type Action = {
  type: string,
  payload: any,
}

export const createAction = (type: string, payload: any = null): Action => {
  return {
    type,
    payload
  } as Action
}
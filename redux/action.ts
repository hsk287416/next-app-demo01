export const CHANGE_NAME = 'CHANGE_NAME';

export const changeNameAction = (name: string) => {
    return {
        type: CHANGE_NAME,
        payload: name
    }
}
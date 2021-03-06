import { DialogActionTypes } from './dialogs.actions'

type DialogType = {
  id: number
  name: string
}
type MessageType = {
  id: number
  message: string
}

const initialState = {
  messagesData: [
    {
      id: 1,
      message: 'Hi',
    },
    {
      id: 2,
      message: 'Yo',
    },
    {
      id: 3,
      message: 'Yo',
    },
    {
      id: 4,
      message: 'Yo',
    },
    {
      id: 5,
      message: 'Yo',
    },
    {
      id: 6,
      message: 'Yo',
    },
  ] as Array<MessageType>,
  dialogsData: [
    {
      id: 1,
      name: 'Dimes',
    },
    {
      id: 2,
      name: 'Murad',
    },
    {
      id: 3,
      name: 'Yarik',
    },
    {
      id: 4,
      name: 'Savva',
    },
    {
      id: 5,
      name: 'Vasya',
    },
    {
      id: 6,
      name: 'LeMaman',
    },
  ] as Array<DialogType>,
}

export type DialogsInitialStateType = typeof initialState

export const dialogsReducer = (
  state = initialState,
  action: DialogActionTypes
): DialogsInitialStateType => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      const newMessage = {
        id: 7,
        message: action.payload,
      }
      return {
        ...state,
        messagesData: [...state.messagesData, newMessage],
      }

    default:
      return state
  }
}

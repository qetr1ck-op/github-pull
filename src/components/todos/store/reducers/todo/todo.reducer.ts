import { TodoFilter } from '../../../enums'
import { Todo } from '../../../types'
import { ActionType, ActionTypes } from '../../actions'

export interface TodoState {
  todos: TodoDictionary
  filter: TodoFilter
  isLoading: boolean
  isAddLoading: boolean
  error: string
}

export interface TodoDictionary {
  [id: string]: Todo
}

const initialState: TodoState = {
  todos: {},
  filter: TodoFilter.All,
  isLoading: false,
  isAddLoading: false,
  error: '',
}
export const todoReducer = (state = initialState, action: ActionTypes): TodoState => {
  switch (action.type) {
    case ActionType.GetLoading: {
      return { ...state, isLoading: true }
    }
    case ActionType.GetSuccess:
    case ActionType.UpdateSuccess:
    case ActionType.UpdateLoading:
    case ActionType.UpdateError: {
      return {
        ...state,
        isLoading: false,
        todos: toDictionary(action.payload, 'id'),
      }
    }

    case ActionType.AddLoading:
    case ActionType.AddSuccess: {
      return {
        ...state,
        isAddLoading: false,
        todos: { ...state.todos, [action.payload.id]: action.payload },
      }
    }

    case ActionType.DeleteOne: {
      /*return {
        filter: state.filter,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      }*/
    }
    case ActionType.DeleteAll: {
      /*return {
        filter: state.filter,
        todos: state.todos.filter((todo) => !todo.done),
      }*/
    }
    case ActionType.ToggleStatusAll: {
      /*return {
        filter: state.filter,
        todos: state.todos.map((todo) => ({ ...todo, done: action.payload.done })),
      }*/
    }
    case ActionType.FilterChange: {
      // return { filter: action.payload.filter, todos: state.todos }
    }

    default: {
      return state
    }
  }
}

export function toDictionary<T>(array: T[], key) {
  return array.reduce((dictionary, item) => {
    return { ...dictionary, [item[key]]: item }
  }, {})
}

export function toList<T, K extends keyof T>(dictionary: T): Array<T[K]> {
  return Object.values(dictionary).map((value) => value)
}

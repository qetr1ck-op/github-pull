import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Dispatch } from 'redux'

import * as fromRootState from '../../store/root'
import * as fromTodoActions from './store/actions/todo'
import * as fromTodoSelectors from './store/selectors/todo'

import { TodoFilter } from './enums'
import { TodoCheckAll, TodoInput, TodoList } from './shared'
import { Todo } from './types'

import style from './todos.css'

interface State {
  isAllChecked: boolean
}

interface RouterProps {
  filter?: string
}

interface StateProps {
  todos: Todo[]
  totalTodos: number
}

interface DispatchProps {
  dispatch: Dispatch<fromTodoActions.TodoActions>
}

type Props = StateProps & DispatchProps & RouteComponentProps<RouterProps>

class Todos extends React.PureComponent<Props, State> {
  state = {
    isAllChecked: false,
  }

  render() {
    const { isAllChecked } = this.state
    const { todos, totalTodos } = this.props

    return (
      <section className={style.main}>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <h1 className={style.title}>todos</h1>
        <div className={style.header}>
          {!!todos.length && (
            <TodoCheckAll isAllChecked={isAllChecked} checkAll={this.checkAllItems} />
          )}
          <TodoInput
            value=""
            changeValue={({ value }: Todo) => this.dispatch(new fromTodoActions.Add({ value }))}
          />
        </div>

        <TodoList
          todos={todos}
          totalTodos={totalTodos}
          hasDoneItems={fromTodoSelectors.hasDoneTodos(todos)}
        />
      </section>
    )
  }

  private dispatch = this.props.dispatch

  private checkAllItems = () => {
    this.setState((state: State) => {
      return {
        isAllChecked: !state.isAllChecked,
      }
    })
    this.dispatch(new fromTodoActions.ToggleDoneStatusAll({ done: !this.state.isAllChecked }))
  }
}

function mapStateToProps(state: fromRootState.RootState, props: Props): StateProps {
  const { todos } = state.todo
  return {
    todos: fromTodoSelectors.getFilteredTodos(
      state,
      (props.match.params.filter as TodoFilter) || TodoFilter.All,
    ),
    totalTodos: todos.length,
  }
}

export const TodosConnected = connect<StateProps>(mapStateToProps)(Todos)

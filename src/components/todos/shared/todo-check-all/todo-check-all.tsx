import classNames from 'classnames'
import React from 'react'

import style from './todo-check-all.css'

interface Props {
  isAllChecked: boolean
  checkAll(): void
}

export const TodoCheckAll = ({ isAllChecked, checkAll }: Props) => (
  <>
    <input
      id="check-all"
      type="checkbox"
      className={style.checkAll}
      checked={isAllChecked}
      onChange={checkAll}
    />
    <label
      htmlFor="check-all"
      className={classNames({
        [style.label]: true,
        [style.checked]: isAllChecked,
      })}
    />
  </>
)

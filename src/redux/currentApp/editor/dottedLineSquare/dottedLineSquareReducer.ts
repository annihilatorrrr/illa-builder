import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  DottedLineSquare,
  DottedLineSquareState,
} from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareState"

export const addOrUpdateDottedLineSquareReducer: CaseReducer<
  DottedLineSquareState,
  PayloadAction<DottedLineSquare>
> = (state, action) => {
  state.map[action.payload.displayName] = action.payload
}

export const removeDottedLineSquareReducer: CaseReducer<
  DottedLineSquareState,
  PayloadAction<string>
> = (state, action) => {
  delete state.map[action.payload]
}

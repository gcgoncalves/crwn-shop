import { createSelector } from "reselect"
import { Category, CategoryMap, CategoryState } from "./category.types"

interface RootState {
  category: CategoryState
}

const selectCategoryReducer = (state: RootState) => state.category

export const selectCurrentCategories = 
  createSelector(
    [selectCategoryReducer], 
    (categoryState: CategoryState) => categoryState.categories
  )

export const selectCategories = createSelector(
  [selectCurrentCategories],
  categories => categories.reduce(
      (accumulator: CategoryMap, category: Category) => {
        accumulator[category.title.toLowerCase()] = category.items
        return accumulator
      }, {} as CategoryMap
    ) as CategoryMap
)
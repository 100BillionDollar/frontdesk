import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

// Plain useDispatch/useSelector ki jagah inhe use karo — types free milte hain.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

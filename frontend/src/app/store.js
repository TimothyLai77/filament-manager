import { configureStore } from '@reduxjs/toolkit'
import jobReducer from '../features/jobs/jobSlice'
import spoolReducer from '../features/spools/spoolSlice'
import  markSpoolFinishedReducer  from '@/features/spools/markSpoolFinishedSlice'
export const store = configureStore({
    reducer: {
        spools: spoolReducer,
        jobs: jobReducer,
        markSpoolFinished: markSpoolFinishedReducer
    },
})


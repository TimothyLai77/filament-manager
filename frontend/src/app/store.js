import { configureStore } from '@reduxjs/toolkit'
import jobReducer from '../features/jobs/jobSlice'
import spoolReducer from '../features/spools/spoolSlice'
import markSpoolFinishedReducer from '@/features/spools/markSpoolFinishedSlice'
import editJobReducer from '@/features/jobs/editJobSlice'
import editSpoolReducer from '@/features/spools/editSpoolSlice'
import fetchSpoolAttributeReducer from '@/features/spools/spoolAttributesSlice'
import createSpoolReducer from '@/features/spools/createSpoolSlice'
export const store = configureStore({
    reducer: {
        spools: spoolReducer,
        jobs: jobReducer,
        editJobs: editJobReducer,
        editSpools: editSpoolReducer,
        markSpoolFinished: markSpoolFinishedReducer,
        spoolAttributes: fetchSpoolAttributeReducer,
        createSpools: createSpoolReducer
    },
})


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSpoolById } from '@/features/spools/spoolSlice';
import { fetchJobListById } from '@/features/jobs/jobSlice';
const initialState = {
    editSuccess: null,
    loading: false,
    error: null
}


export const editJob = createAsyncThunk(
    '/API/jobs/edit/:jobId',
    async (payload, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await fetch(`/api/jobs/edit/${payload.jobId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.status == 200) {
                const state = getState()
                // refresh the job list & spool details with the updated data
                dispatch(fetchSpoolById(state.spools.spoolDetails.id));
                dispatch(fetchJobListById(state.spools.spoolDetails.id));
                return response.json();
            } else {
                return rejectWithValue(500)
            }

        } catch (err) {
            return err
        }
    }
)

export const editJobSlice = createSlice({
    name: "editJobs",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // EDIT JOB
            .addCase(editJob.pending, (state) => {
                state.editSuccess = false;
                state.loading = true;
            })
            .addCase(editJob.fulfilled, (state) => {
                // push the returned data to jobList
                state.editSuccess = true;

            })
            .addCase(editJob.rejected, (state, action) => {
                state.editSuccess = false;
                state.loading = false;
                state.error = action.payload
            })
    }
})


export default editJobSlice.reducer;
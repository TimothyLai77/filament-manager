import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    returnedJob: null,
    loading: false,
    error: null
}


export const editJob = createAsyncThunk(
    '/API/jobs/edit/:jobId',
    async (payload, thunkAPI) => {
        try {
            const response = await fetch(`/api/jobs/edit/${payload.jobId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.status == 500) return thunkAPI.rejectWithValue("status 500 error")
            return response.json();
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
                state.returnedJob = null;
                state.loading = true;
            })
            .addCase(editJob.fulfilled, (state, action) => {
                // push the returned data to jobList
                state.loading = false;
                state.returnedJob = action.payload;
            })
            .addCase(editJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})


export default editJobSlice.reducer;
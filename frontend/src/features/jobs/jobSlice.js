import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    jobList: [],
    loading: false,
    error: null
}


export const fetchJobListById = createAsyncThunk(
    'api/jobs/history/SpoolId',
    async (spoolId) => {
        try {
            const response = await fetch(`/api/jobs/history/${spoolId}`);
            return response.json();
        } catch (err) {
            return err;
        }

    }
)


export const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobListById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJobListById.fulfilled, (state, action) => {
                // push the returned data to jobList
                state.loading = false;
                state.jobList = action.payload;
            })
            .addCase(fetchJobListById.rejected, (state, action) => {
                state.loading = false;
                state.payload.error = action.payload
            })
    }
})


export default jobSlice.reducer;
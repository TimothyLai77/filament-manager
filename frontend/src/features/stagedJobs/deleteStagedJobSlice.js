import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStagedJobs } from "./fetchStagedJobsSlice";


const initialState = {
    loading: null,
    error: null
}

export const deleteStagedJob = createAsyncThunk(
    '/api/stagedjobs/delete',
    async (id, { rejectWithValue, dispatch }) => {
        const response = await fetch(`/api/stagedJobs/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            dispatch(fetchStagedJobs())
        } else {
            rejectWithValue(response.status)
        }
    }
)

export const deleteStagedJobSlice = createSlice({
    name: 'deleteStagedJobs',
    initialState,
    reducers: {

    },
    extraReducers: (buidler) => {
        buidler
            .addCase(deleteStagedJob.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteStagedJob.fulfilled, (state) => {
                state.loading = false;

            })
            .addCase(deleteStagedJob.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
    }
})

export default deleteStagedJobSlice.reducer
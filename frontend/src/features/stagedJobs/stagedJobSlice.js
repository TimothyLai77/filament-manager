import StagedJobs from "@/pages/StagedJobs";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    listLoading: null,
    detailLoading: null,
    error: null,
    stagedJobList: [],
    stagedJobDetail: null,
    // loading/error for delete thunk
    deleteLoading: null,
    deleteError: null,
}


export const commitStagedJob = createAsyncThunk(
    '/api/stagedjobs/commit',
    async (payload, { rejectWithValue }) => {

        const response = await fetch(`/api/stagedJobs/commit/${payload.jobId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            return response.json();
        } else {
            rejectWithValue(response.status)
        }
    }
)


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


export const fetchStagedJob = createAsyncThunk(
    '/api/stagedjobs/:id',
    async (id) => {
        try {
            const response = await fetch(`/api/stagedJobs/${id}`)
            return response.json();
        } catch (error) {
            return error
        }
    }
)


export const fetchStagedJobs = createAsyncThunk(
    '/api//stagedJobs',
    async () => {
        try {
            const response = await fetch('/api/stagedJobs')
            return response.json();
        } catch (error) {
            return error
        }
    }
)

export const stagedJobSlice = createSlice({
    name: "stagedjobs",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // GETTING ALL JOBS FROM DB
            .addCase(fetchStagedJobs.pending, (state) => {
                state.listLoading = true;
                state.error = null;
            })
            .addCase(fetchStagedJobs.fulfilled, (state, action) => {
                state.listLoading = false;
                state.error = false;
                state.stagedJobList = action.payload
            })
            .addCase(fetchStagedJobs.rejected, (state, action) => {
                state.listLoading = false;
                state.error = action.payload;
            })

            // GETTING ONE JOB BY ID
            .addCase(fetchStagedJob.pending, (state) => {
                state.detailLoading = true;
                state.error = false;
                state.stagedJobDetail = null;
            })
            .addCase(fetchStagedJob.fulfilled, (state, action) => {
                state.detailLoading = false;
                state.error = false;
                state.stagedJobDetail = action.payload
            })
            .addCase(fetchStagedJob.rejected, (state, action) => {
                state.detailLoading = false;
                state.error = action.payload;
            })



            // DELETE STAGED JOBS
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

export default stagedJobSlice.reducer

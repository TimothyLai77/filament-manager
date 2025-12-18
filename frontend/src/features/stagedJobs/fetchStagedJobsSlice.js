import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    loading: null,
    error: null,
    stagedJobList: [],
    stagedJobDetail: null,
}


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

export const fetchStagedJobsSlice = createSlice({
    name: "stagedjobs",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // GETTING ALL JOBS FROM DB
            .addCase(fetchStagedJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStagedJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.stagedJobList = action.payload
            })
            .addCase(fetchStagedJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // GETTING ONE JOB BY ID
            .addCase(fetchStagedJob.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.stagedJobDetail = null;
            })
            .addCase(fetchStagedJob.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.stagedJobDetail = action.payload
            })
            .addCase(fetchStagedJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default fetchStagedJobsSlice.reducer

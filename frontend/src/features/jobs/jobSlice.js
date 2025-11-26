import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    jobList: [],
    submittedJob: null, // needed for the toast confirmation on job creation
    loading: false,
    error: null
}

// todo: move into its own slice
// Create a new job given the spool
// Payload should be:
/**
 * {
        'spoolId': 'spool-xxxxxxxx',
        'name': '...',
        'filamentAmountUsed': xx.xx
        'cost': xx.xx // can also leave as null to let backend calculate it
 * }
 */
export const createJob = createAsyncThunk(
    '/api/jobs/create',
    async (payload) => {
        try {
            const response = await fetch('/api/jobs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            return response.json();
        } catch (err) {
            return err;
        }
    }
)




// Fetch the list of jobs that a spool has been used in
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
            // FETCH JOB LIST
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

            // SUBMIT JOB  
            .addCase(createJob.pending, (state) => {
                state.submittedJob = null; // not sure if this is needed, but reset the submission to null if it errors
                state.loading = true;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.loading = false;
                state.submittedJob = action.payload;
            })
            .addCase(createJob.rejected, (state, action) => {
                state.loading = false;
                state.payload.error = action.payload
            })


    }
})


export default jobSlice.reducer;
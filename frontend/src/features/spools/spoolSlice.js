import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//TODO: maybe break this up into multiple features?
const initialState = {
    spoolList: [],
    spoolDetails: {},
    selectedSpool: null, // todo: decide if i actually need/want this.
    finishedSpoolList: [],
    loading: false,
    error: null
}


export const markSpoolAsFinished = createAsyncThunk(
    'api/spools/mark-finished/:spoolId',
    async (spoolId) => {
        try {
            const response = await fetch(`api/spools/mark-finished/${spoolId}`, {
                method: 'POST',
            })
            return response.json();
        } catch (err) {
            return err;
        }
    }
)

// Get the list of finished/empty spools
export const fetchFinishedSpoolsList = createAsyncThunk(
    'api/finished-spools',
    async () => {
        try {
            const response = await fetch('api/finished-spools');
            return response.json();
        } catch (err) {
            return err;
        }
    }
)


// Get the details of a spool given the spool's ID
export const fetchSpoolById = createAsyncThunk(
    'api/spools/:id',
    async (spoolId) => {
        try {
            const response = await fetch(`/api/spools/${spoolId}`);
            return response.json();
        } catch (err) {
            return err;
        }
    }
)

// Get the main list of spools for the dashboard. 
export const fetchActiveSpoolList = createAsyncThunk(
    'api/active-spools',
    async () => {
        try {
            const response = await fetch(`/api/active-spools`);
            return response.json();
        } catch (err) {
            return err;
        }

    }
)


export const spoolSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setSelectedSpool: (state, action) => {
            state.selectedSpool = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // FETCH ACTIVE SPOOLS
            .addCase(fetchActiveSpoolList.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchActiveSpoolList.fulfilled, (state, action) => {
                // push the returned data to jobList
                state.loading = false;
                state.spoolList = action.payload;

            })
            .addCase(fetchActiveSpoolList.rejected, (state, action) => {
                // todo: i actually don't know if this works, like the entire error handling part
                state.error = action.payload
            })

            // FETCH SPOOL DETAILS BY ID
            .addCase(fetchSpoolById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSpoolById.fulfilled, (state, action) => {
                state.loading = false;
                state.spoolDetails = action.payload;
            })
            .addCase(fetchSpoolById.rejected, (state, action) => {
                state.error = action.payload
            })


            // FETCH FINISHED SPOOLS LIST
            .addCase(fetchFinishedSpoolsList.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFinishedSpoolsList.fulfilled, (state, action) => {
                state.loading = false;
                state.finishedSpoolList = action.payload;
            })
            .addCase(fetchFinishedSpoolsList.rejected, (state, action) => {
                state.error = action.payload
            })

            // MARK SPOOL AS FINISHED
            .addCase(markSpoolAsFinished.pending, (state) => {
                state.loading = true;
            })
            .addCase(markSpoolAsFinished.fulfilled, (state, action) => {
                state.loading = false;
                // not sure on this, but i guesss just have components select this and watch it in a useeffect for the asyncthunk to finish?
                state.spoolDetails = action.payload;
            })
            .addCase(markSpoolAsFinished.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const { setSelectedSpool } = spoolSlice.actions
export default spoolSlice.reducer;
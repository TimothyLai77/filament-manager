import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    spoolList: [],
    spoolDetails: {},
    selectedSpool: null,
    loading: false,
    error: null
}



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
    }
})

export const { setSelectedSpool } = spoolSlice.actions
export default spoolSlice.reducer;
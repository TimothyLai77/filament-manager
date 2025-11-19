import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const initialState = {
    successMarkedFinished: null,
    loading: false,
    error: null
}

// mark the spool as finished 
export const markSpoolAsFinished = createAsyncThunk(
    'api/spools/mark-finished/:spoolId',
    async (spoolId) => {
        try {
            const response = await fetch(`api/spools/mark-finished/${spoolId}`, {
                method: 'PUT',
            })
            // backend returns the same spool, with the updated isEmpty set to true (on success)
            return response.json();
        } catch (err) {
            return err;
        }
    }
)



export const markSpoolFinishedSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // MARK SPOOL AS FINISHED
            .addCase(markSpoolAsFinished.pending, (state) => {
                state.successMarkedFinished = null;
                state.loading = true;
            })
            .addCase(markSpoolAsFinished.fulfilled, (state, action) => {
                state.loading = false;
                // Not sure about putting another variable in the state, just for the one feature. Or this asyncthunk+reducer shoudl be its own feature
                state.spoolDetails.isEmpty ? state.successMarkedFinished = true : state.successMarkedFinished = false
            })
            .addCase(markSpoolAsFinished.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})


export default markSpoolFinishedSlice.reducer;
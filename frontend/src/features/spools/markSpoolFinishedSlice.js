import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSpoolById } from './spoolSlice'
const initialState = {
    successMarkedFinished: null,
    loading: false,
    error: null
}

// mark the spool as finished 
export const markSpoolAsFinished = createAsyncThunk(
    'api/spools/mark-finished/:spoolId',
    async ({ spoolId }, { dispatch }) => {
        try {
            const response = await fetch(`/api/spools/mark-finished/${spoolId}`, {
                method: 'PUT',
            })

            // todo: fix this. this is ultra jank. Need to update the selectedSpool value in store with the updated spool data
            // Google Gemini says it's possible to add an extraReducer in the other slice, and then have 
            // that fire when this asyncthunk is fulfilled. 

            dispatch(fetchSpoolById(spoolId))
            // backend returns the same spool, with the updated isEmpty set to true (on success)
            return response.json();
        } catch (err) {
            return err;
        }
    }
)



export const markSpoolFinishedSlice = createSlice({
    name: "markSpoolFinished",
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
                // check the returned object from backend that the boolean is set to true. 
                action.payload.isEmpty ? state.successMarkedFinished = true : state.successMarkedFinished = false
            })
            .addCase(markSpoolAsFinished.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})


export default markSpoolFinishedSlice.reducer;
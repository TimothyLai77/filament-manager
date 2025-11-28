import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchActiveSpoolList, fetchFinishedSpoolsList } from "./spoolSlice";

const initialState = {
    loading: false,
    error: null
}


const deleteSpool = createAsyncThunk(
    '/api/spools/deleteSpool',
    async (spoolId, { dispatch, rejectWithValue }) => {
        const response = await fetch(`/api/spools/${spoolId}`, {
            method: "DELETE"
        });
        if (response.status.ok) {
            // refetch the spool lists from the database
            dispatch(fetchActiveSpoolList);
            dispatch(fetchFinishedSpoolsList);
        } else {
            // this seems like a lazy way to do it?
            rejectWithValue(response.status);
        }
    }
)

const deleteSpoolSlice = createSlice({
    name: 'deleteSpool',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(deleteSpool.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSpool.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteSpool.rejected, (state, payload) => {
                state.loading = false;
                state.error = payload.action
            })
    }
})

export default deleteSpoolSlice.reducer;
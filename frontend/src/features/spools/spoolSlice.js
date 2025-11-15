import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    spoolList: [],
    loading: false,
    error: null
}


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
                state.error = action.payload
            })
    }
})


export default spoolSlice.reducer;
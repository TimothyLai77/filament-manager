import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    spoolAttributes: [],
    loading: false,
    error: null,

}

export const fetchSpoolAttributes = createAsyncThunk(
    'api/spools/attributes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/spools/attributes')
            if (response.status == 200) return response.json()
            return rejectWithValue(500) // idk what to do
        } catch (error) {
            return error
        }
    }
)


export const fetchSpoolAttributesSlice = createSlice({
    name: 'fetchSpoolAttributes',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // FETCH SPOOL ATTRIBUTES
            .addCase(fetchSpoolAttributes.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchSpoolAttributes.fulfilled, (state, action) => {

                state.spoolAttributes = action.payload
                state.loading = false;
            })
            .addCase(fetchSpoolAttributes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default fetchSpoolAttributesSlice.reducer;
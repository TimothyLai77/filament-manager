import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchActiveSpoolList } from '@/features/spools/spoolSlice';
const initialState = {
    status: null, // null, 'success', '
    loading: false,
    error: null
}


export const createSpool = createAsyncThunk(
    '/api/spools/create',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`/api/spools/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.status == 200) {
                // refresh the spoolist on creation
                dispatch(fetchActiveSpoolList());
                return response.json();
            } else {
                return rejectWithValue(500)
            }

        } catch (err) {
            return err
        }
    }
)

export const createSpoolSlice = createSlice({
    name: "createSpool",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // EDIT JOB
            .addCase(createSpool.pending, (state) => {

                state.loading = true;
            })
            .addCase(createSpool.fulfilled, (state) => {
                state.loading = false;


            })
            .addCase(createSpool.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload
            })
    }
})


export default createSpoolSlice.reducer;
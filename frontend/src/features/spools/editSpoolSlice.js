import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSpoolById } from '@/features/spools/spoolSlice';
const initialState = {
    editSuccess: null,
    loading: false,
    error: null
}


export const editSpool = createAsyncThunk(
    '/api/spools/edit/:spoolIdId',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`/api/spools/edit/${payload.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.status == 200) {
                // refresh the spool details on update
                dispatch(fetchSpoolById(payload.id));
                return response.json();
            } else {
                return rejectWithValue(500)
            }

        } catch (err) {
            return err
        }
    }
)

export const editSpoolSlice = createSlice({
    name: "editSpool",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // EDIT JOB
            .addCase(editSpool.pending, (state) => {
                state.editSuccess = false;
                state.loading = true;
            })
            .addCase(editSpool.fulfilled, (state) => {
                // push the returned data to jobList
                state.editSuccess = true;

            })
            .addCase(editSpool.rejected, (state, action) => {
                state.editSuccess = false;
                state.loading = false;
                state.error = action.payload
            })
    }
})


export default editSpoolSlice.reducer;
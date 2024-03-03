import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postRequest = createAsyncThunk(
  "post/postRequest",
  async ({ url, data }) => {
    try {
      const response = await axios.post(
        `http://37.27.23.25:8090/api/v1${url}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

export const getRequest = createAsyncThunk(
  "post/getRequest",
  async ({ url }) => {
    try {
      const response = await axios.get(`http://37.27.23.25:8090${url}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);

const apiSlice = createSlice({
  name: "data",
  initialState: {
    status: "idle",
    error: "null",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(postRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getRequest.pending, (state) => {
        state.loading = true;
        state.status = "succeeded";
      })
      .addCase(getRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;

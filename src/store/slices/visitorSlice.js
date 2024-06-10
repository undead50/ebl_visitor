import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosInstance';
import { notification } from 'antd';

const callNotification = ((description, type) => {
  notification.open({
    message: 'info',
    description: description,
    duration: 3, // Duration in seconds, 0 means the notification won't close automatically,
    type: type,
  });
})

const initialState = {
  visitors: [],
  visitor_loading: false,
  visitor_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchVisitorsAsync = createAsyncThunk('visitor/fetchVisitors', async () => {
  try {
    const url = BACKEND_URL + '/visitor/fetchVisitors';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createVisitorAsync = createAsyncThunk(
  'visitor/createVisitor',
  async (visitorData) => {
    try {
      const url = BACKEND_URL + '/visitor/createVisitor';
      const response = await axiosInstance.post(url, visitorData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const checkOutVisitorAsync = createAsyncThunk(
  'visitor/checkOutVisitor',
  async (visitorData) => {
    try {
      const url = BACKEND_URL + `/visitor/checkOutVisitor/${visitorData.id
    }`;
      const response = await axiosInstance.put(url, visitorData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);


export const updateVisitorAsync = createAsyncThunk(
  'visitor/updateVisitor',
  async (visitorData) => {
    try {
      const url = BACKEND_URL + `/visitor/updateVisitor/${visitorData.id
    }`;
      const response = await axiosInstance.put(url, visitorData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteVisitorAsync = createAsyncThunk(
  'visitor/deleteVisitor',
  async (visitorId) => {
    try {
      const url = BACKEND_URL + `/visitor/deleteVisitor/${ visitorId } `;
      await axiosInstance.delete(url);
      return visitorId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const visitorSlice = createSlice({
  name: 'visitor',
  initialState,
  reducers: {
    resetStateVisitor: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitorsAsync.pending, (state) => {
        state.visitor_loading = true;
        state.error = null;
      })
      .addCase(fetchVisitorsAsync.fulfilled, (state, action) => {
        state.visitor_loading = false;
        state.visitors = action.payload;
      })
      .addCase(fetchVisitorsAsync.rejected, (state, action) => {
        state.visitor_loading = false;
        state.error = action.error.message;
      })
      .addCase(createVisitorAsync.pending, (state) => {
        state.visitor_loading = true;
        state.error = null;
      })
      .addCase(createVisitorAsync.fulfilled, (state, action) => {
        state.visitor_loading = false;
        state.visitors.push(action.payload);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(createVisitorAsync.rejected, (state, action) => {
        state.visitor_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(checkOutVisitorAsync.pending, (state) => {
        state.visitor_loading = true;
        state.error = null;
      })
      .addCase(checkOutVisitorAsync.fulfilled, (state, action) => {
        state.visitor_loading = false;
        const updatedVisitor = action.payload;
        const index = state.visitors.findIndex(
          (visitor) => visitor.id === updatedVisitor.id
        );
        if (index !== -1) {
          state.visitors[index] = updatedVisitor;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(checkOutVisitorAsync.rejected, (state, action) => {
        state.visitor_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateVisitorAsync.pending, (state) => {
        state.visitor_loading = true;
        state.error = null;
      })
      .addCase(updateVisitorAsync.fulfilled, (state, action) => {
        state.visitor_loading = false;
        const updatedVisitor = action.payload;
        const index = state.visitors.findIndex(
          (visitor) => visitor.id === updatedVisitor.id
        );
        if (index !== -1) {
          state.visitors[index] = updatedVisitor;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateVisitorAsync.rejected, (state, action) => {
        state.visitor_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteVisitorAsync.pending, (state) => {
        state.visitor_loading = true;
        state.error = null;
      })
      .addCase(deleteVisitorAsync.fulfilled, (state, action) => {
        state.visitor_loading = false;
        const visitorId = action.payload;
        state.visitors = state.visitors.filter((visitor) => visitor.id !== visitorId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteVisitorAsync.rejected, (state, action) => {
        state.visitor_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      });
  },
});
export const { resetStateVisitor } = visitorSlice.actions;
export const visitorReducer = visitorSlice.reducer;
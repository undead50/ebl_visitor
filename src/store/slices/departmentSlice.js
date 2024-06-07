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
  departments: [],
  department_loading: false,
  department_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchDepartmentsAsync = createAsyncThunk('department/fetchDepartments', async () => {
  try {
    const url = BACKEND_URL + '/department/fetchDepartments';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createDepartmentAsync = createAsyncThunk(
  'department/createDepartment',
  async (departmentData) => {
    try {
      const url = BACKEND_URL + '/department/createDepartment';
      const response = await axiosInstance.post(url, departmentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateDepartmentAsync = createAsyncThunk(
  'department/updateDepartment',
  async (departmentData) => {
    try {
      const url = BACKEND_URL + `/department/updateDepartment/${departmentData.id
    }`;
      const response = await axiosInstance.put(url, departmentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteDepartmentAsync = createAsyncThunk(
  'department/deleteDepartment',
  async (departmentId) => {
    try {
      const url = BACKEND_URL + `/department/deleteDepartment/${ departmentId } `;
      await axiosInstance.delete(url);
      return departmentId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    resetStateDepartment: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartmentsAsync.pending, (state) => {
        state.department_loading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentsAsync.fulfilled, (state, action) => {
        state.department_loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartmentsAsync.rejected, (state, action) => {
        state.department_loading = false;
        state.error = action.error.message;
      })
      .addCase(createDepartmentAsync.pending, (state) => {
        state.department_loading = true;
        state.error = null;
      })
      .addCase(createDepartmentAsync.fulfilled, (state, action) => {
        state.department_loading = false;
        state.departments.push(action.payload);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(createDepartmentAsync.rejected, (state, action) => {
        state.department_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateDepartmentAsync.pending, (state) => {
        state.department_loading = true;
        state.error = null;
      })
      .addCase(updateDepartmentAsync.fulfilled, (state, action) => {
        state.department_loading = false;
        const updatedDepartment = action.payload;
        const index = state.departments.findIndex(
          (department) => department.id === updatedDepartment.id
        );
        if (index !== -1) {
          state.departments[index] = updatedDepartment;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateDepartmentAsync.rejected, (state, action) => {
        state.department_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteDepartmentAsync.pending, (state) => {
        state.department_loading = true;
        state.error = null;
      })
      .addCase(deleteDepartmentAsync.fulfilled, (state, action) => {
        state.department_loading = false;
        const departmentId = action.payload;
        state.departments = state.departments.filter((department) => department.id !== departmentId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteDepartmentAsync.rejected, (state, action) => {
        state.department_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      });
  },
});
export const { resetStateDepartment } = departmentSlice.actions;
export const departmentReducer = departmentSlice.reducer;
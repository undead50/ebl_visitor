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
  employees: [],
  employee_loading: false,
  employee_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchEmployeesAsync = createAsyncThunk('employee/fetchEmployees', async () => {
  try {
    const url = BACKEND_URL + '/employee/fetchEmployees';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createEmployeeAsync = createAsyncThunk(
  'employee/createEmployee',
  async (employeeData) => {
    try {
      const url = BACKEND_URL + '/employee/createEmployee';
      const response = await axiosInstance.post(url, employeeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateEmployeeAsync = createAsyncThunk(
  'employee/updateEmployee',
  async (employeeData) => {
    try {
      const url = BACKEND_URL + `/employee/updateEmployee/${employeeData.id
    }`;
      const response = await axiosInstance.put(url, employeeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  'employee/deleteEmployee',
  async (employeeId) => {
    try {
      const url = BACKEND_URL + `/employee/deleteEmployee/${ employeeId } `;
      await axiosInstance.delete(url);
      return employeeId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    resetStateEmployee: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesAsync.pending, (state) => {
        state.employee_loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
        state.employee_loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployeesAsync.rejected, (state, action) => {
        state.employee_loading = false;
        state.error = action.error.message;
      })
      .addCase(createEmployeeAsync.pending, (state) => {
        state.employee_loading = true;
        state.error = null;
      })
      .addCase(createEmployeeAsync.fulfilled, (state, action) => {
        state.employee_loading = false;
        state.employees.push(action.payload);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(createEmployeeAsync.rejected, (state, action) => {
        state.employee_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateEmployeeAsync.pending, (state) => {
        state.employee_loading = true;
        state.error = null;
      })
      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
        state.employee_loading = false;
        const updatedEmployee = action.payload;
        const index = state.employees.findIndex(
          (employee) => employee.id === updatedEmployee.id
        );
        if (index !== -1) {
          state.employees[index] = updatedEmployee;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateEmployeeAsync.rejected, (state, action) => {
        state.employee_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteEmployeeAsync.pending, (state) => {
        state.employee_loading = true;
        state.error = null;
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.employee_loading = false;
        const employeeId = action.payload;
        state.employees = state.employees.filter((employee) => employee.id !== employeeId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteEmployeeAsync.rejected, (state, action) => {
        state.employee_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      });
  },
});
export const { resetStateEmployee } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
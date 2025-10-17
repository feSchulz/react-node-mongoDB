import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "../services/authService";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

//Registrar usuario e fazer login

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const data = await authServices.register(user);
    console.log("retorno da api: ", data);
    //veriicando erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    
    return data;
  }
);

//logout an user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authServices.logout();
});

//Sing in an user

export const login = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    const data = await authServices.login(user);
    console.log("retorno da api: ", data);
    //veriicando erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.user = null;
        })
        .addCase(logout.fulfilled, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = null;
          state.user = null;
        })
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.user = null;
        });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
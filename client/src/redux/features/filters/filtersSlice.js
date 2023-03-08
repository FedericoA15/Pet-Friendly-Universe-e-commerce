import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersFiltered: [],
  listObject: {},
};

export const Filters = createSlice({
  name: "Filters",
  initialState,
  reducers: {
    getAllUsers: (state, { payload }) => {
      state.listObject = payload;
    },
    getUsersFiltered: (state, { payload }) => {
      state.usersFiltered = payload;
    },
    deleteUser: (state, { payload }) => {
      state.usersFiltered = payload;
    },
    deleteStore: (state, { payload }) => {
      state.usersFiltered = payload;
    },
    deleteWalker: (state, { payload }) => {
      state.usersFiltered = payload;
    },
    deleteDaycare: (state, { payload }) => {
      state.usersFiltered = payload;
    },
    approvedUser: (state, { payload }) => {
      state.usersFiltered = payload;
    },
    approvedStore: (state, { payload }) => {
      state.usersFiltered = payload;
    },
    approvedWalker: (state, { payload }) => {
      state.usersFiltered = payload;
    },
    approvedDaycare: (state, { payload }) => {
      state.usersFiltered = payload;
    },
  },
});

export const {
  getAllUsers,
  getUsersFiltered,
  deleteUser,
  deleteStore,
  deleteWalker,
  deleteDaycare,
  approvedUser,
  approvedStore,
  approvedWalker,
  approvedDaycare,
} = Filters.actions;
export default Filters.reducer;

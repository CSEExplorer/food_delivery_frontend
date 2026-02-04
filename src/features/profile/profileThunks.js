import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserProfileApi,
  updateUserProfileApi,
} from "../../api/profileApi";

/**
 * Fetch profile using userId
 */
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetchUserProfileApi(userId);
      console.log("I am coming form the profile Service", res.data);
      if (res.data?.errors?.length) {
        return rejectWithValue(res.data.errors[0].message);
      }

      return res.data.data.getProfileByUserId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

/**
 * Update profile
 */
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ profileId, input }, { rejectWithValue }) => {
    try {
      const res = await updateUserProfileApi(profileId, input);

      if (res.data?.errors?.length) {
        return rejectWithValue(res.data.errors[0].message);
      }

      return res.data.data.updateProfile;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

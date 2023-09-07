import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permaImage: [],
  images: [],
  filteredImg: [],
};

export const ImageSlice = createSlice({
  name: "Images",
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.permaImage = action.payload;
      state.images = action.payload;
    },
    getImages: (state, action) => {
      state.filteredImg = state.permaImage.filter(
        (item) => item._id == action.payload
      );
    },
    updateImgView: (state, action) => {
      state.images = state.permaImage.map((item) => {
        if (item._id == action.payload._id) {
          item.views++;
        }
        return item;
      });
    },
    searchImage: (state, action) => {
      const arr = state.permaImage.filter((item) => {
        if (
          item?.title?.toLowerCase().includes(action.payload) ||
          item?.description?.toLowerCase().includes(action.payload) ||
          item?.userId?.name?.toLowerCase().includes(action.payload)
        )
          return item;
      });
      state.images = arr;
    },
  },
});

export const { setImages, getImages, updateImgView, searchImage } =
  ImageSlice.actions;

export default ImageSlice.reducer;

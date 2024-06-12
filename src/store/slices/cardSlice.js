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
  cards: [],
  card_loading: false,
  card_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchCardsAsync = createAsyncThunk('card/fetchCards', async () => {
  try {
    const url = BACKEND_URL + '/card/fetchCards';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createCardAsync = createAsyncThunk(
  'card/createCard',
  async (cardData) => {
    try {
      const url = BACKEND_URL + '/card/createCard';
      const response = await axiosInstance.post(url, cardData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateCardAsync = createAsyncThunk(
  'card/updateCard',
  async (cardData) => {
    try {
      const url = BACKEND_URL + `/card/updateCard/${cardData.id
    }`;
      const response = await axiosInstance.put(url, cardData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteCardAsync = createAsyncThunk(
  'card/deleteCard',
  async (cardId) => {
    try {
      const url = BACKEND_URL + `/card/deleteCard/${ cardId } `;
      await axiosInstance.delete(url);
      return cardId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    resetStateCard: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardsAsync.pending, (state) => {
        state.card_loading = true;
        state.error = null;
      })
      .addCase(fetchCardsAsync.fulfilled, (state, action) => {
        state.card_loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCardsAsync.rejected, (state, action) => {
        state.card_loading = false;
        state.error = action.error.message;
      })
      .addCase(createCardAsync.pending, (state) => {
        state.card_loading = true;
        state.error = null;
      })
      .addCase(createCardAsync.fulfilled, (state, action) => {
        state.card_loading = false;
        state.cards.push(action.payload);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(createCardAsync.rejected, (state, action) => {
        state.card_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateCardAsync.pending, (state) => {
        state.card_loading = true;
        state.error = null;
      })
      .addCase(updateCardAsync.fulfilled, (state, action) => {
        state.card_loading = false;
        const updatedCard = action.payload;
        const index = state.cards.findIndex(
          (card) => card.id === updatedCard.id
        );
        if (index !== -1) {
          state.cards[index] = updatedCard;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateCardAsync.rejected, (state, action) => {
        state.card_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteCardAsync.pending, (state) => {
        state.card_loading = true;
        state.error = null;
      })
      .addCase(deleteCardAsync.fulfilled, (state, action) => {
        state.card_loading = false;
        const cardId = action.payload;
        state.cards = state.cards.filter((card) => card.id !== cardId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteCardAsync.rejected, (state, action) => {
        state.card_loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      });
  },
});
export const { resetStateCard } = cardSlice.actions;
export const cardReducer = cardSlice.reducer;
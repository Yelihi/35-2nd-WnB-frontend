import produce from 'immer';

const initialState = {
  data: {
    startDay: null,
    endDay: null,
    selectLocation: null,
    totalGuest: null,
  },
  isClickSearch: true,
  isDateModalOpen: false,
  isLocationModalOpen: false,
  isGuestModalOpen: false,
  currentModalId: 0,
  searchForAccommodationLoading: false,
  searchForAccommodationSuccess: false,
  searchForAccommodationError: false,
};

export const CLICK_SEARCHBAR = 'CLICK_SEARCHBAR';

export const CLICK_DATE_MODAL = 'CLICK_DATE_MODAL';

export const CLICK_LOCATION_MODAL = 'CLICK_LOCATION_MODAL';

export const CLICK_GUEST_MODAL = 'CLICK_GUEST_MODAL';

export const LAYOUT_CLICK = 'LAYOUT_CLICK';

export const SEARCH_ACCOMMODATION_REQUEST = 'SEARCH_ACCOMMODATION_REQUEST';
export const SEARCH_ACCOMMODATION_SUCCESS = 'SEARCH_ACCOMMODATION_SUCCESS';
export const SEARCH_ACCOMMODATION_FAILURE = 'SEARCH_ACCOMMODATION_FAILURE';

export const clickSearchBar = () => ({
  type: CLICK_SEARCHBAR,
});

export const clickLocationModal = () => ({
  type: CLICK_LOCATION_MODAL,
});

export const clickDateModal = () => ({
  type: CLICK_DATE_MODAL,
});

export const clickGuestModal = () => ({
  type: CLICK_GUEST_MODAL,
});

export const layoutClick = () => ({
  type: LAYOUT_CLICK,
});

export const searchAccommodationRequest = data => ({
  type: SEARCH_ACCOMMODATION_REQUEST,
  data,
});

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case CLICK_SEARCHBAR: {
        draft.isClickSearch = !draft.isClickSearch;
        break;
      }
      case LAYOUT_CLICK: {
        draft.isLocationModalOpen = false;
        draft.isDateModalOpen = false;
        draft.isGuestModalOpen = false;
        draft.currentModalId = 0;
        draft.isClickSearch = false;
        break;
      }
      case CLICK_LOCATION_MODAL: {
        draft.isLocationModalOpen = true;
        draft.isDateModalOpen = false;
        draft.isGuestModalOpen = false;
        draft.currentModalId = 1;
        break;
      }
      case CLICK_DATE_MODAL: {
        draft.isLocationModalOpen = false;
        draft.isDateModalOpen = true;
        draft.isGuestModalOpen = false;
        draft.currentModalId = 2;
        break;
      }
      case CLICK_GUEST_MODAL: {
        draft.isLocationModalOpen = false;
        draft.isDateModalOpen = false;
        draft.isGuestModalOpen = true;
        draft.currentModalId = 3;
        break;
      }
      case SEARCH_ACCOMMODATION_REQUEST: {
        draft.searchForAccommodationLoading = true;
        draft.searchForAccommodationSuccess = false;
        draft.searchForAccommodationError = false;
        draft.data.startDay = action.data.startDay;
        draft.data.endDay = action.data.endDay;
        draft.data.selectLocation = action.data.selectLocation;
        draft.data.totalGuest = action.data.totalGuest;
        break;
      }
      case SEARCH_ACCOMMODATION_SUCCESS: {
        draft.searchForAccommodationLoading = false;
        draft.searchForAccommodationSuccess = action.data;
        draft.isLocationModalOpen = false;
        draft.isDateModalOpen = false;
        draft.isGuestModalOpen = false;
        draft.currentModalId = 0;
        draft.isClickSearch = true;
        break;
      }
      case SEARCH_ACCOMMODATION_FAILURE: {
        draft.searchForAccommodationLoading = false;
        draft.searchForAccommodationSuccess = false;
        draft.searchForAccommodationError = action.error;
        break;
      }
    }
  });
};

import { produce } from 'immer';

const initialState = {
  location: '지도표시지역',
  guestCount: 0,
  date: {
    start: null,
    end: null,
  },
  isToken: false,
  isClickUserInfoButton: false,
  isOpenLoginModal: false,
};

export const TOKEN_EXIST = 'TOKEN_EXIST';
export const TOKEN_DELETE = 'TOKEN_DELETE';

export const CLICK_USER_INFO_BUTTON = 'CLICK_USER_INFO_BUTTON';

export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';

export const SWITCH_TO_LOGIN_MODAL = 'SWITCH_TO_LOGIN_MODAL';

export const WINDOW_RELOAD = 'WINDOW_RELOAD';

export const SET_LOCATION = 'SET_LOCATION';

export const UP_TO_GUEST_COUNT = 'UP_TO_GUEST_COUNT';
export const DOWN_TO_GUEST_COUNT = 'DOWN_TO_GUEST_COUNT';

export const CHANGE_DATE = 'CHANGE_DATE';

export const clickUserInfoButton = () => ({
  type: CLICK_USER_INFO_BUTTON,
});

export const openLoginModal = () => ({
  type: OPEN_LOGIN_MODAL,
});

export const switchModal = () => ({
  type: SWITCH_TO_LOGIN_MODAL,
});

export const reLoadPage = () => ({
  type: WINDOW_RELOAD,
});

export const setLocation = data => ({
  type: SET_LOCATION,
  data,
});

export const addCountGuest = () => ({
  type: UP_TO_GUEST_COUNT,
});

export const decreseCountGuest = () => ({
  type: DOWN_TO_GUEST_COUNT,
});

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case TOKEN_EXIST: {
        draft.isToken = true;
        break;
      }
      case TOKEN_DELETE: {
        draft.isToken = false;
        break;
      }
      case CLICK_USER_INFO_BUTTON: {
        draft.isClickUserInfoButton = !draft.isClickUserInfoButton;
        break;
      }
      case OPEN_LOGIN_MODAL: {
        draft.isOpenLoginModal = !draft.isOpenLoginModal;
        break;
      }
      case SWITCH_TO_LOGIN_MODAL: {
        draft.isOpenLoginModal = !draft.isOpenLoginModal;
        draft.isClickUserInfoButton = !draft.isClickUserInfoButton;
        break;
      }
      case WINDOW_RELOAD: {
        window.location.replace('/');
        break;
      }
      case SET_LOCATION: {
        draft.location = action.data;
        break;
      }
      case UP_TO_GUEST_COUNT: {
        draft.guestCount = draft.guestCount + 1;
        break;
      }
      case DOWN_TO_GUEST_COUNT: {
        draft.guestCount = draft.guestCount - 1;
        break;
      }
      case CHANGE_DATE: {
        draft.date.start = action.data.start;
        draft.date.end = action.data.end;
        break;
      }
    }
  });
};

import React, { createContext, useContext, useReducer, useState } from 'react';
import { ModalIDs } from '../../config/modalsConfig';
export const typeCreator = (reducerName: string, label: string): string =>
  `[${reducerName}][${label}]`;
export enum StateStatus {
  Success = 'Success',
  Pending = 'Pending',
  Failed = 'Failed'
}
export interface IAction {
  type: string;
  status?: StateStatus;
  data: any;
}
export const SET_MODAL_VISIBILITY: string = typeCreator('ModalReducer', 'SetModalVisibility');
export interface IModalValue {
  params: {
    [key: string]: any;
  };
  visible: boolean;
}

export interface IState {
  modals: {
    [key: string]: IModalValue;
  };
}

const modalIDs = Object.values(ModalIDs);

const modals = () => {
  const map: IState['modals'] = {};
  for (var id of modalIDs) {
    map[id] = {
      params: {},
      visible: false
    };
  }
  return map;
};

const initialState = {
  modals: modals(),
  order: []
};

const modalReducer = (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case SET_MODAL_VISIBILITY:
      return {
        ...state,
        modals: action.data.modals
      };
    default:
      return {
        ...state
      };
  }
};

export const ModalContext = React.createContext([initialState, (action: IAction) => {}] as [
  IState,
  React.Dispatch<IAction>
]);

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  console.log('state', state);
  return <ModalContext.Provider value={[state, dispatch]}>{children}</ModalContext.Provider>;
};

export const useModalData = (modalID: string) => {
  const [state, dispatch] = useContext(ModalContext);

  return state.modals[modalID];
};
export const useModalAction = () => {
  const [state, dispatch] = useContext(ModalContext);
  return {
    open: (modalID: string, params: any) =>
      dispatch({
        type: SET_MODAL_VISIBILITY,
        data: {
          modals: {
            ...modals(),
            [modalID]: {
              params,
              visible: true
            }
          }
        }
      }),
    close: (modalID: string) =>
      dispatch({
        type: SET_MODAL_VISIBILITY,
        data: {
          modals: {
            ...state.modals,
            [modalID]: {
              params: null,
              visible: false
            }
          }
        }
      })
  };
};

import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';

export const templateSelector = createSelector(
    (state: IRootState) => state.verifierTx,
    (template) => template,
);

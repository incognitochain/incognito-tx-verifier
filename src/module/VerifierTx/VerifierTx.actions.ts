import { ACTION_FETCHED } from './VerifierTx.constant';

export const actionFetched = (payload: any) => ({
    type: ACTION_FETCHED,
    payload,
});

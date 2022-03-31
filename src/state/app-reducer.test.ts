import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        appStatus: "idle",
        isInitialized: false,
    }
});

test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppErrorAC({error: 'some error'}));

    expect(endState.error).toBe('some error');
});

test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatusAC({appStatus: 'loading'}));

    expect(endState.appStatus).toBe('loading');
});
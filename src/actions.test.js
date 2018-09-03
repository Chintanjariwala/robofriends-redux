import * as actions from "./actions";
import * as types from "./constants";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

export const mockStore = configureMockStore([thunkMiddleware]);

describe("actions", () => {
  it("should create an action to search", () => {
    const text = "Finish docs";
    const expectedAction = {
      type: types.CHANGE_SEARCHFIELD,
      payload: text
    };
    expect(actions.setSearchField(text)).toEqual(expectedAction);
  });
});

describe("Fetch Robots", () => {
  it("Handles requesting PENDING and SUCCESS", () => {
    const mockPayload = [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz"
      }
    ];

    global.fetch = jest.fn(() => Promise.resolve({ json: () => mockPayload }));

    const expectedActions = [
      { type: types.REQUEST_ROBOTS_PENDING },
      { type: types.REQUEST_ROBOTS_SUCCESS, payload: mockPayload }
    ];

    const store = mockStore();
    return store.dispatch(actions.requestRobots()).then(() => {
      const action = store.getActions();
      expect(action).toEqual(expectedActions);
    });
  });

  it("Handles requesting FAILED", () => {
    global.fetch = jest.fn(() =>
      Promise.reject({ json: () => new Error("some error") })
    );

    const expectedActions = {
      type: types.REQUEST_ROBOTS_FAILED,
      payload: expect.anything()
    };

    const store = mockStore();
    return store.dispatch(actions.requestRobots()).then(data => {
      const action = store.getActions();
      expect(action).toContainEqual(expectedActions);
    });
  });
});

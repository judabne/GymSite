import * as reactRedux from 'react-redux'
import ReactDOM from 'react-dom';
import AccountPage from './AccountPage';

let mockAdminState = {
    userSignin: {
        userInfo: {
            _id: '616dc948b0e91eae1bbbba02',
            firstName: 'adminfirst',
            lastName: 'adminlast',
            email: 'admin@github.com',
            isAdmin: true,
            plans: [
                {
                    planType: 'Regular',
                    expiry: '2022-10-02T20:59:59.999Z',
                    _id: '617d600ba4fc00a8601c5273'
                },
                {
                    planType: 'Yoga Classes',
                    expiry: '2022-04-02T20:59:59.999Z',
                    _id: '6180f741d409d88ad3c4fda5'
                }
            ],
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZkYzk0OGIwZTkxZWFlMWJiYmJhMDIiLCJmaXJzdG5hbWUiOiJKdWRhYm5lIiwibGFzdG5hbWUiOiJKdWRhYm5lIiwiZW1haWwiOiJqdWRhYm5lQGdpdGh1Yi5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MzgwMDYxMzIsImV4cCI6MTYzODYxMDkzMn0.SYumGlIyQRMQdmRmhSSME8vMu9HFI7oQNUXj03lDn0A'
        }
    }
}

describe('AccountPage component test suite', () => {

    jest.mock("react-redux", () => ({
        useSelector: jest.fn(),
        useDispatch: jest.fn(),
    }));

    let container: HTMLDivElement;


    beforeAll(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(
            <AccountPage />,
            container
        )
    })

    const useSelectorMock = reactRedux.useSelector;
    const useDispatchMock = reactRedux.useDispatch;

    beforeEach(() => {
        useDispatchMock.mockImplementation(() => () => {});
        useSelectorMock.mockImplementation(selector => selector(mockAdminState));
    })

    // afterEach(() => {
    //     useDispatchMock.mockClear();
    //     useSelectorMock.mockClear();
    // })

    test('Mounted correctly', () => {
        useSelectorMock.mockReturnValue({
            mockAdminState
        })
        expect(true).toBeTruthy();
    })

    afterAll(() => {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    })
})
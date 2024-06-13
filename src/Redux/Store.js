import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi! How are you?", name: "Alex K", likesCount: 20},
                {id: 2, message: "It's my first message!", name: "Alex K", likesCount: 40},
                {id: 3, message: "perviy nah", name: "Alex K", likesCount: 4},
                {id: 4, message: "?", name: "Alex K", likesCount: 140},
                {id: 5, message: "who you are?", name: "Alex K", likesCount: 40}
            ],
            newPostText: ""
        },
        dialogsPage: {
            dialogs: [
                {
                    id: 1,
                    name: "Alex",
                    imgUrl: "https://thumbs.dreamstime.com/b/%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D1%8B-%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E-179376714.jpg"
                },
                {
                    id: 2,
                    name: "Iryna",
                    imgUrl: "https://scontent-fra5-2.xx.fbcdn.net/v/t1.18169-9/24058996_117586239023974_207239477539843924_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Kdt02x803M4Ab4Hjzsu&_nc_ht=scontent-fra5-2.xx&oh=00_AfCjp1AXm1sPzTNM1umfxPcvu-rtVTcyacT2RZWl8H4rSg&oe=6654C584"
                },
                {
                    id: 3,
                    name: "Alina",
                    imgUrl: "https://thumbs.dreamstime.com/b/%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D1%8B-%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E-179376714.jpg"
                },
                {
                    id: 4,
                    name: "Vitya",
                    imgUrl: "https://thumbs.dreamstime.com/b/%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D1%8B-%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E-179376714.jpg"
                },
                {
                    id: 5,
                    name: "Leva",
                    imgUrl: "https://thumbs.dreamstime.com/b/%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D1%8B-%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E-179376714.jpg"
                },
                {
                    id: 6,
                    name: "Ded",
                    imgUrl: "https://thumbs.dreamstime.com/b/%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D1%8B-%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E-179376714.jpg"
                }
            ],
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "Hallo zusammen!"},
                {id: 3, message: "Wie geht es dir?"},
            ],
            newDialogMessage: ""
        },
        sideBar: {
            friends: [
                {id: 2, name: "Iryna"},
                {id: 3, name: "Alina"},
                {id: 4, name: "Vitya"},
                {id: 5, name: "Leva"},
                {id: 6, name: "Ded"}
            ]
        }
    },
    _callSubscriber() {
        //console.log("State changed!")
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sideBar = sidebarReducer(this._state.sideBar, action);

        this._callSubscriber(this._state);
    }
}

export default store;
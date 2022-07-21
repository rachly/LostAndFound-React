import * as ActionType from "../../ActionTypes";

const instialState = {
    isBargin: null,
    type: null,
    itemId: null,
    selected: null,
    items: [],
    categorys: [], 
    itemById: [],
    colors: [],
    sum: 0,
    


}
export const itemReducer = (state = instialState, action) => {
    switch (action.type) {
        case ActionType.SAVE_ITEMS:
            console.log(action.paylod)
            return {
                ...state,
                items: [...action.paylod.arr],
                sum: action.paylod.sum
            }
        case ActionType.SET_ITEMS:
            console.log(action.paylod)
            return {
                ...state,
                itemId: action.paylod.itemId,
                items: [...state.items, action.paylod]
            }
        case ActionType.SAVE_CATEGORY:
            console.log(action.paylod)
            return {
                ...state,
                categorys: [...action.paylod]
            }

        case ActionType.UPDATE_ITEM:
            console.log(action.paylod) 
            const item = [...state.itemById]
            item.find(x => x.itemId == action.paylod.itemId).isActive = false;
            console.log(item)
            return {
                ...state,
                
                itemById:item,
                selected:null
            }
        case ActionType.SET_IS_BARGIN:
            console.log("SET_IS_BARGIN", action.paylod)
            return {
                ...state,
                isBargin: action.paylod
            }
        case ActionType.SET_IS_TYPE:
            console.log("SET_IS_TYPE", action.paylod)
            return {
                ...state,
                type: action.paylod
            }
        case ActionType.ITEM_BY_ID:
            console.log(action.paylod)
            return {
                ...state,
                itemById: [...action.paylod]
            }
        case ActionType.SAVE_COLORS:
            console.log(action.paylod)
            return {
                ...state,
                colors: [...action.paylod]
            }
        case ActionType.SELECT_EDIT:
            console.log(action.item)
            return {
                ...state,
                selected: action.item
            }
            case ActionType.EDIT_ITEM:
                console.log(action.paylod) 
                const item1 = [...state.itemById]
              const ind=  item1.findIndex(x => x.itemId == action.paylod.itemId);
                item1[ind] = action.paylod;
                console.log(item1)
                return{
                    ...state,
                    // items:[...state.items,action.paylod],
                    itemsById:item1,
                    selected:null
                }
        default: return state;
    }
}
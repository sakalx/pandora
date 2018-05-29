
const initialState = [
    {
        data: [
           { title: "Reddit is great stuff" },
           { data: "Reddit is Cool beans" },
           { children: [
            "child1",
            "child2", 
            "child3" ]
            }
        ],
        error: null
    }
]

const redditReducer = (state=initialState, action) => {


    switch (action.type) {
        case "GET_REDDIT_START":
            console.log("Getting Data...")
            return {...state, fetching: true };
        break;
        case "GOT_REDDIT_DATA":
            console.log("Got Reddit Data: ", action.payload);

            return {
                    ...state,
                    fetching: false,
                    fetched: true,
                    reddit_results: action.payload
                    //data: "Got our Data"
            };
        break;
        case "DATA_REDDIT_ERROR":
            console.log("Error Getting Data...");
            return {
                ...state, 
                fetching: false, 
                error: action.payload, 
                reddit_results: initialState
            } ;
        break;
    }//end switch
    return state;
}

export default redditReducer

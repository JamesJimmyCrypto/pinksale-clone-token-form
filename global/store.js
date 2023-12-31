import { configureStore } from "@reduxjs/toolkit";

import blockchainSlice from "./slice/blockchainSlice";

export const store = configureStore ({
    reducer: {
        blockchain: blockchainSlice
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ['blokchain/updateData'],
                ignoredPaths: ['blockchain.provider']
            }
        })
})


import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchT = createAsyncThunk(
//   "t/fetchT",
//   async (params: waitParamsProps | null, thunkAPI) => {
//     try {
//       const { data } = await axios.get<IGroups>(`https://626d16545267c14d5677d9c2.mockapi.io/items`, {
//         params: params,
//         cancelToken: params?.cancelToken,
//       });
//       return data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue("Не удалось загрузить курсов");
//     }
//   }
// );

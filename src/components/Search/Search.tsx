import { IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import useAppDispatch from "../../hooks/useAppDispatch.hook";
import useAppSelector from "../../hooks/useAppSelector.hook";
import {
  setSearchParamsClean,
  setSearchParamsFrom,
  setSearchParamsName,
  setSearchParamsPhone,
  setSearchParamsTo,
} from "../../redux/searchParams/slice";
import MyDateInput from "../Form/MyDateInput";
import MyPhoneInput from "../Form/MyPhoneInput";
import SearchIcon from "@mui/icons-material/Search";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClearIcon from "@mui/icons-material/Clear";
import EmailIcon from "@mui/icons-material/Email";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SendTgMesssage from "../CustomTable/components/SendTgMesssage";
type SearchProps = {
  onSearch: (args: any) => void;
};
const Search = ({ onSearch }: SearchProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSelector((state) => state.searchParams);

  useEffect(() => {
    return () => {
      dispatch(setSearchParamsClean());
    };
  }, []);

  const onClickSearch = () => {
    onSearch(searchParams);
  };
  const onClickClear = async () => {
    dispatch(setSearchParamsClean());
    onSearch({ page: 1, take: 10 });
  };
  return (
    <Stack sx={{ mb: 2 }} direction="row" spacing={1}>
      <TextField
        value={searchParams.name}
        onChange={(e) => dispatch(setSearchParamsName(e.target.value))}
        label={t("fio")}
        placeholder="User"
        size="small"
      />
      <MyPhoneInput
        value={searchParams.phone}
        onChange={(e) => dispatch(setSearchParamsPhone(e.target.value))}
        label={t("phone")}
      />
      <MyDateInput
        value={searchParams.from as Dayjs}
        label={t("from")}
        onChangeValue={(val) => dispatch(setSearchParamsFrom(val))}
      />
      <MyDateInput
        value={searchParams.to as Dayjs}
        label={t("to")}
        onChangeValue={(val) => dispatch(setSearchParamsTo(val))}
      />
      <ButtonGroup>
        <IconButton onClick={onClickSearch} color="info">
          <SearchIcon />
        </IconButton>
        <IconButton onClick={onClickClear} color="error">
          <ClearIcon />
        </IconButton>
        <SendTgMesssage />
      </ButtonGroup>
    </Stack>
  );
};

export default Search;

export interface ISettingsState {
  data: ISettingsData;
  isLoading: boolean;
  isSending: boolean;
  isSendingMessage: boolean;
  count: number;
}

export interface ISettingsData {
  id: number;
  bot_token: string;
  bot_username: string;
  bot_chat_id: string;
  contact: string;
  status: number;
  createdAt: Date | string;
}

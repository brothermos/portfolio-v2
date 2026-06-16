export type ApiRequest = {
  method?: string;
};

export type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (statusCode: number) => {
    json: (body: unknown) => void;
  };
};

interface LocationResponseI {
  status: string;
  'status-code': number;
  version: string;
  access: string;
  total: number;
  offset: number;
  limit: number;
  data: {
    [key: string]: CountryDataI;
  };
}

interface CountryDataI {
  country: string;
  region: string;
}
export default interface loginResponse {
  data?: {
    success: boolean;
    message: string;
    statusCode: number;
    data: string;
  };
  error?: any;
}

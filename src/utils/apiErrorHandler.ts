export const apiErrorHandler = (
  error: unknown,
  setError: (msg: string) => void,
  fallbackMessage: string
) => {
  if (error instanceof Error) {
    setError(error.message);
  } else {
    setError(`${fallbackMessage}: ${String(error)}`);
  }
};

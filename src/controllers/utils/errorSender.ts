export const errorSender = (err: unknown, caseMessage: string) => {
  return err instanceof Error ? err.message : `${caseMessage}`;
};

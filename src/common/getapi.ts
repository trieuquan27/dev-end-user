export async function isFinished({
  response,
  path,
}: {
  response: any;
  path: string;
}) {
  return response.url().includes(path);
}

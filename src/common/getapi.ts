export async function getApi({
  response,
  path,
}: {
  response: any;
  path: string;
}) {
  return response.url().includes(path);
}

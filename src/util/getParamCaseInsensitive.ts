export default function getParamCaseInsensitive(
    object: Record<string, string | string[] | undefined>,
    name: string
  ): string | undefined {
    return Object.entries(object ?? {}).find((e) => e?.[0]?.toLowerCase() === name.toLowerCase())?.[1] as
      | string
      | undefined;
  }
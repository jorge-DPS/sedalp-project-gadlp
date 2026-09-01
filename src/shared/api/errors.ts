import axios from 'axios'

export interface ApiError {
  message: string
  errors: Record<string, string[]>
  status: number | null
}

export function getApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    return {
      message: error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
      errors: {},
      status: null,
    }
  }

  const data = error.response?.data as
    { message?: string; errors?: Record<string, string[] | string> } | undefined
  const errors = Object.fromEntries(
    Object.entries(data?.errors ?? {}).map(([field, messages]) => [
      field,
      Array.isArray(messages) ? messages : [messages],
    ]),
  )

  return {
    message: data?.message ?? 'No fue posible completar la solicitud.',
    errors,
    status: error.response?.status ?? null,
  }
}

export function firstFieldError(
  errors: Record<string, string[]>,
  field: string,
): string | undefined {
  return errors[field]?.[0]
}

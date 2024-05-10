import React from 'react'
import type { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Provider({ children }: PropsWithChildren) {
	const [client] = React.useState(
		new QueryClient({
			defaultOptions: {
				queries: { refetchOnWindowFocus: false }
			}
		})
	)

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

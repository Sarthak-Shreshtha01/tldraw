import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, expect, it, vi } from 'vitest'
import { ImportFileActionItem } from './menu-items'

const menuItemIds: string[] = []
beforeEach(() => {
  menuItemIds.length = 0
})

vi.mock('tldraw', async (importOriginal) => ({
	...(await importOriginal<typeof import('tldraw')>()),
	TldrawUiMenuItem: ({ id }: { id: string }) => {
		menuItemIds.push(id)
		return null
	},
}))
vi.mock('react-router-dom', () => ({ useNavigate: () => vi.fn() }))
vi.mock('../../hooks/useAppState', () => ({ useMaybeApp: () => null }))
vi.mock('../../utils/app-ui-events', () => ({ useTldrawAppUiEvents: () => vi.fn() }))
vi.mock('../../utils/i18n', async (importOriginal) => ({
	...(await importOriginal<typeof import('../../utils/i18n')>()),
	defineMessages: (messages: unknown) => messages,
	useMsg: () => 'Import file',
}))
vi.mock('../../utils/tldrawOfflineFiles', async (importOriginal) => ({
	...(await importOriginal<typeof import('../../utils/tldrawOfflineFiles')>()),
	useRejectTldrawOfflineFiles: () => vi.fn(),
}))

describe('ImportFileActionItem', () => {
	it('uses the import-file id', async () => {
		const root = createRoot(document.createElement('div'))
		await act(async () => root.render(<ImportFileActionItem />))
		await act(async () => root.unmount())
		expect(menuItemIds).toEqual(['import-file'])
	})
})

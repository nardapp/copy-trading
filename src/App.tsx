import React from 'react'

import { createThirdwebClient } from 'thirdweb'
import { useConnect, useDisconnect, useActiveWallet, useSwitchActiveWalletChain } from 'thirdweb/react'
import { Wallet, createWallet, injectedProvider } from 'thirdweb/wallets'
import { optimism } from 'thirdweb/chains'

const client = createThirdwebClient({ clientId: 'YOUR_ID' })

function App() {
	const [active, setActive] = React.useState(false)

	const { connect } = useConnect()
	const { disconnect } = useDisconnect()

	const switchChain = useSwitchActiveWalletChain()
	const wallet = useActiveWallet()

	return (
		<div className="wrapper">
			<main className="main">
				{active === false ? (
					<button
						className="btn"
						onClick={() => {
							connect(async () => {
								const metamask = createWallet('io.metamask')

								// if user has metamask installed, connect to it
								if (injectedProvider('io.metamask')) {
									await metamask.connect({ client })
								}

								// open wallet connect modal so user can scan the QR code and connect
								else {
									await metamask.connect({
										client,
										walletConnect: { showQrModal: true }
									})
								}
								return metamask
							})
							setActive(true)
						}}
					>
						<span>Connect</span>
					</button>
				) : (
					<>
						<h1>
							<strong>Address:</strong> {wallet?.getAccount()?.address}
						</h1>

						<button className="btn" onClick={() => switchChain(optimism)}>
							<span>Switch Chain</span>
						</button>

						<button
							className="btn"
							onClick={() => {
								disconnect(wallet as Wallet)
								setActive(false)
							}}
						>
							<span>Disconnect</span>
						</button>
					</>
				)}
			</main>
		</div>
	)
}

export default App

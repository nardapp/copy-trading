import 'viem/window'
import React from 'react'

function App() {
	const [accounts, setAccounts] = React.useState<string>('')

	const connectWallet = async () => {
		try {
			const account = await window.ethereum!.request({ method: 'eth_requestAccounts' })
			setAccounts(account?.[0])
		} catch (error) {
			console.log(error)
		}
	}

	const disconnectWallet = async () => {
		try {
			await window.ethereum!.request({
				method: 'wallet_revokePermissions',
				params: [{ eth_accounts: {} }]
			})
			setAccounts('')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="wrapper">
			<main className="main">
				{accounts ? (
					<>
						<span>
							<b>Address:</b> {accounts}
						</span>
						<button onClick={() => disconnectWallet()} className="btn">
							<span>Disonnect</span>
						</button>
					</>
				) : (
					<button onClick={() => connectWallet()} className="btn">
						<span>Connect</span>
					</button>
				)}
			</main>
		</div>
	)
}

export default App

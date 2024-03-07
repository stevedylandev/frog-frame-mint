/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog'
import { handle } from 'frog/next'
import { abi } from './abi.json'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub API URL to enable frame verification.
  // hubApiUrl: 'https://api.hub.wevm.dev',
})


app.frame('/', (c) => {
  return c.res({
    action: '/finish',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Perform a transaction
      </div>
    ),
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
    ]
  })
})
 
app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    )
  })
})
 
 
app.transaction('/mint', (c) => {
  return c.contract({
    abi,
    chainId: 'eip155:84532',
    functionName: 'mint',
    args: ["0xaD73eafCAc4F4c6755DFc61770875fb8B6bC8A25"],
    to: '0x893af2c848edc36f95d0fbd85a409c3191ddb0b8',
  })
})

export const GET = handle(app)
export const POST = handle(app)

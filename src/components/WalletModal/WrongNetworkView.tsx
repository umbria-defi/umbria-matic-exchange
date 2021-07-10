
import { AbstractConnector } from '@web3-react/abstract-connector'
import React from 'react'
import styled from 'styled-components'
import { injected } from '../../connectors'
import { ButtonSecondary } from '../Button'
import { ChainId } from '@uniswap/sdk'
import { InjectedConnector } from '@web3-react/injected-connector'

const ChangeNetwork = styled(ButtonSecondary)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`



const MessageWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  flex-wrap: wrap;
  margin-left:1rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 1rem;
    font-size: 12px;
  `};
`

export default function WrongNetworkView() {
  let error: string | undefined
    return (
        <MessageWrapper>
              <p>You are currently connected to the wrong network. Please click the button below to switch.</p>
              <ChangeNetwork
              style={{ fontSize: '.825rem', fontWeight: 400 }}
              onClick={() => {
                  injected.getProvider().then((provider) => {
                  provider.request({
                      method: 'wallet_switchEthereumChain',
                      // Web3 expects a hex-formatted representation
                      params: [{ chainId: '0x' + ChainId.MATIC.toString(16) }],
                  }).catch((ex: any) => {
                    // Probably should do something to inform the user that there is already a pending request.
                  })
                  })
              }}
              >
              Switch
              </ChangeNetwork>
        </MessageWrapper>
    )
}

import CampaignItem from '../components/CampaignItem'
import type { Campaign } from '../types/Campaign'
import { useState } from 'react'
import CampaignFilter from '../components/CampaignFilter'
import { useQuery, gql } from '@apollo/client'

// GraphQL query: hent alle kampagner
const GET_CAMPAIGNS = gql`
  query {
    campaigns {
      id
      name
      channel
      startDate
      endDate
      cost
      revenue
      profitMargin
      product {
        name
        category
        basePrice
      }
    }
  }
`

function CampaignList() {
  const [selectedChannel, setSelectedChannel] = useState('')
  const { data, loading, error } = useQuery(GET_CAMPAIGNS)

  const campaignsData = (data?.campaigns || []) as Campaign[]
  const uniqueChannels = [...new Set(campaignsData.map((c: Campaign) => c.channel))]

  const filteredCampaigns = selectedChannel
    ? campaignsData.filter((campaign: Campaign) => campaign.channel === selectedChannel)
    : campaignsData

  return (
    <div>

      <div>
        <CampaignFilter channels={uniqueChannels} onChannelChange={setSelectedChannel} />
      </div>

      <div>
        {loading && <p>Indlæser kampagner</p>}
        {error && <p>Fejl: {error.message}</p>}
        {!loading && !error && (
          filteredCampaigns.map((campaign: Campaign) => (
            <CampaignItem key={campaign.id} campaign={campaign} />
          ))
        )}
      </div>

    </div>
  )
}

export default CampaignList
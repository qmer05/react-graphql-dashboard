import { useState } from 'react'
import type { Campaign } from '../types/Campaign'
import '../index.css'

type Props = {
  campaign: Campaign
}

function CampaignItem({ campaign }: Props) {

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <button className='button' onClick={() => setIsExpanded(!isExpanded)}><p>{campaign.name}</p></button>
      {isExpanded && (
        <div>
          <p>Channel: {campaign.channel}</p>
          <p>Product name: {campaign.product.name}</p>
          <p>Cost: {campaign.cost} kr.</p>
          <p>Profit margin: {campaign.profitMargin}</p>
        </div>
      )}
    </div>
  )
}

export default CampaignItem
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_CAMPAIGN_BY_ID = gql`
  query ($id: Int!) {
    campaign(id: $id) {
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

function CampaignDetail() {
  // Hent ID fra URL'en (fx /campaign/3)
  const { id } = useParams();

  const numericId = parseInt(id || '0')

  const { data, loading, error } = useQuery(GET_CAMPAIGN_BY_ID, {
    variables: { id: numericId }
  })

  const campaign = data?.campaign

  // Hvis kampagnen ikke findes, loader eller der opstod en fejl
  if (loading) return <p> Indlæser kampagne...</p>
  if (error) return <p>Fejl: {error.message}</p>
  if (!campaign) return <p>Kampagne ikke fundet.</p>

  return (
    <div>
      <h1>Detaljer for kampagne ID: {id}</h1>

      {/* Vis alle primitive felter (id, name, channel, osv.) */}
      <div>
        {Object.entries(campaign)
          .filter(([key]) => key !== '__typename')
          .map(([key, value]) => {
            if (typeof value !== 'object') {
              return <p key={key}>{key}: {value !== undefined ? value.toString() : ''}</p>
            }
            return null; // Spring over objekter (fx product)
          })}
      </div>

      {/* Vis detaljer for produkt-objektet */}
      <div>
        <h2>Produkt</h2>
        {Object.entries(campaign.product)
          .filter(([key]) => key !== '__typename')
          .map(([key, value]) => (
            <p key={key}>{key}: {value !== undefined && value !== null ? value.toString() : ''}</p>
          ))}
      </div>
    </div>
  );
}

export default CampaignDetail;